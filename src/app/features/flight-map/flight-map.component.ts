import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject
} from '@angular/core';
import { Subscription } from 'rxjs';
import type * as Leaflet from 'leaflet';
import { FlightService } from '../../core/service/flight-service';
import { Flight, FlightStatus } from '../../core/models/mock';


@Component({
  selector: 'app-flight-map',
  standalone: true,
  imports: [],
  templateUrl: './flight-map.component.html',
  styleUrls: ['./flight-map.component.scss']
})
export class FlightMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true })
  private mapContainer!: ElementRef<HTMLDivElement>;

  private readonly flightService = inject(FlightService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);

  private leaflet!: typeof Leaflet;
  private map?: Leaflet.Map;
  private route?: Leaflet.Polyline;
  private resizeObserver?: ResizeObserver;
  private destroyed = false;

  private readonly subscriptions = new Subscription();
  private readonly markers = new Map<number, Leaflet.Marker>();

  private flights: Flight[] = [];
  private selectedFlight: Flight | null = null;

  private readonly colors: Record<FlightStatus, string> = {
    Active: '#15803d',
    Delayed: '#a16207',
    Arrived: '#7c3aed'
  };

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const leafletModule = await import('leaflet');

    this.leaflet = (
      leafletModule as unknown as { default?: typeof Leaflet }
    ).default ?? leafletModule;

    if (this.destroyed) {
      return;
    }

    this.initializeMap();

    this.subscriptions.add(
      this.flightService.flights$.subscribe((flights) => {
        this.flights = flights;
        this.renderFlights();

        if (this.selectedFlight) {
          this.highlightFlight(this.selectedFlight);
        } else {
          this.fitAllFlights();
        }
      })
    );

    this.subscriptions.add(
      this.flightService.selectedFlight$.subscribe((flight) => {
        this.selectedFlight = flight;
        this.highlightFlight(flight);
      })
    );

    this.resizeObserver = new ResizeObserver(() => {
      this.map?.invalidateSize({ pan: false });
    });

    this.resizeObserver.observe(this.mapContainer.nativeElement);
  }

  private initializeMap(): void {
    this.map = this.leaflet.map(this.mapContainer.nativeElement, {
      center: [21, 79],
      zoom: 5,
      minZoom: 3,
      maxZoom: 18,
      scrollWheelZoom: false
    });

    this.leaflet.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    ).addTo(this.map);
  }

  private renderFlights(): void {
    if (!this.map) {
      return;
    }

    this.markers.forEach((marker) => marker.remove());
    this.markers.clear();

    for (const flight of this.flights) {
      const marker = this.leaflet.marker(flight.currentPosition, {
        icon: this.createIcon(flight.status),
        title: `${flight.flightNumber} · ${flight.callsign} · ${flight.status}`,
        alt: `${flight.flightNumber} from ${flight.origin.code} to ${flight.destination.code}`,
        keyboard: true,
        riseOnHover: true
      });

      marker.bindPopup(this.createPopup(flight), {
        autoPan: true,
        keepInView: true,
        autoPanPaddingTopLeft: [15, 15],
        autoPanPaddingBottomRight: [15, 15],
        minWidth: 190,
        maxWidth: 260,
        maxHeight: 160
      });

      marker.on('click', () => {
        this.zone.run(() => {
          this.flightService.selectFlight(flight.id);
        });
      });

      marker.addTo(this.map);
      this.markers.set(flight.id, marker);
    }
  }

  private createIcon(
    status: FlightStatus,
    selected = false
  ): Leaflet.DivIcon {
    const size = selected ? 42 : 34;
    const color = this.colors[status];

    return this.leaflet.divIcon({
      className: '',
      html: `
        <div style="
          display: grid;
          place-items: center;
          box-sizing: border-box;
          width: ${size}px;
          height: ${size}px;
          border: 3px solid white;
          border-radius: 50%;
          background: ${color};
          color: white;
          font-size: 21px;
          box-shadow: ${selected
          ? '0 0 0 3px #2563eb, 0 3px 10px #0004'
          : '0 2px 8px #0004'
        };
        ">
          <span aria-hidden="true">✈</span>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2]
    });
  }

  private createPopup(flight: Flight): HTMLElement {
    const container = document.createElement('div');
    container.style.fontFamily = '"Segoe UI", Arial, sans-serif';
    container.style.minWidth = '190px';

    const heading = document.createElement('strong');
    heading.textContent = flight.flightNumber;
    heading.style.fontSize = '16px';
    heading.style.color = '#0f172a';
    container.appendChild(heading);

    const rows = [
      ['Callsign', flight.callsign],
      ['Origin', `${flight.origin.city} (${flight.origin.code})`],
      [
        'Destination',
        `${flight.destination.city} (${flight.destination.code})`
      ],
      ['Status', flight.status]
    ];

    for (const [label, value] of rows) {
      const row = document.createElement('div');
      row.style.marginTop = '8px';

      const labelElement = document.createElement('strong');
      labelElement.textContent = `${label}: `;

      const valueElement = document.createElement('span');
      valueElement.textContent = value;

      row.append(labelElement, valueElement);
      container.appendChild(row);
    }

    return container;
  }

  private highlightFlight(flight: Flight | null): void {
    if (!this.map) {
      return;
    }

    this.route?.remove();
    this.route = undefined;
    this.map.closePopup();

    for (const item of this.flights) {
      const marker = this.markers.get(item.id);
      const selected = item.id === flight?.id;

      marker?.setIcon(this.createIcon(item.status, selected));
      marker?.setZIndexOffset(selected ? 1000 : 0);
    }

    if (!flight) {
      return;
    }

    this.route = this.leaflet.polyline(
      [flight.origin.coordinates, flight.destination.coordinates],
      {
        color: '#2563eb',
        weight: 4,
        opacity: 0.85,
        dashArray: '8 8',
        interactive: false
      }
    ).addTo(this.map);

    this.map.setView(
      flight.currentPosition,
      Math.max(this.map.getZoom(), 5),
      { animate: false }
    );

    this.markers.get(flight.id)?.openPopup();
  }


  private fitAllFlights(): void {
    if (!this.map || !this.flights.length) {
      return;
    }

    const bounds = this.leaflet.latLngBounds(
      this.flights.map((flight) => flight.currentPosition)
    );

    this.map.fitBounds(bounds, {
      padding: [35, 35],
      maxZoom: 6,
      animate: false
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.subscriptions.unsubscribe();
    this.resizeObserver?.disconnect();
    this.map?.remove();
    this.markers.clear();
    this.map = undefined;
  }
}