import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, of } from 'rxjs';
import {
  AIRPORTS,
  Airport,
  Flight,
  FlightStatus,
  MOCK_FLIGHTS
} from '../models/mock';

export interface FlightStats {
  total: number;
  active: number;
  delayed: number;
  arrived: number;
}

export interface FlightFilters {
  callsign: string;
  status: FlightStatus | '';
  origin: string;
  destination: string;
}

export const DEFAULT_FILTERS: FlightFilters = {
  callsign: '',
  status: '',
  origin: '',
  destination: ''
};

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  readonly airports: Airport[] = Object.values(AIRPORTS);

  private readonly allFlights$ = of(MOCK_FLIGHTS);

  private readonly filtersSubject =
    new BehaviorSubject<FlightFilters>({ ...DEFAULT_FILTERS });

  private readonly selectedFlightSubject =
    new BehaviorSubject<Flight | null>(null);

  readonly selectedFlight$ =
    this.selectedFlightSubject.asObservable();

  readonly flights$ = combineLatest([
    this.allFlights$,
    this.filtersSubject
  ]).pipe(
    map(([flights, filters]) =>
      flights.filter((flight) => this.matchesFilters(flight, filters))
    )
  );

  readonly stats$ = this.allFlights$.pipe(
    map((flights): FlightStats => ({
      total: flights.length,
      active: flights.filter((flight) => flight.status === 'Active').length,
      delayed: flights.filter((flight) => flight.status === 'Delayed').length,
      arrived: flights.filter((flight) => flight.status === 'Arrived').length
    }))
  );

  get currentFilters(): FlightFilters {
    return { ...this.filtersSubject.value };
  }

  setFilters(filters: FlightFilters): void {
    const selected = this.selectedFlightSubject.value;

    if (selected && !this.matchesFilters(selected, filters)) {
      this.clearSelection();
    }

    this.filtersSubject.next({ ...filters });
  }

  selectFlight(flightId: number): void {
    const flight = MOCK_FLIGHTS.find(
      (item) =>
        item.id === flightId &&
        this.matchesFilters(item, this.filtersSubject.value)
    );

    this.selectedFlightSubject.next(flight ?? null);
  }

  clearSelection(): void {
    this.selectedFlightSubject.next(null);
  }

  private matchesFilters(
    flight: Flight,
    filters: FlightFilters
  ): boolean {
    const query = filters.callsign.trim().toLowerCase();

    return (
      flight.callsign.toLowerCase().includes(query) &&
      (!filters.status || flight.status === filters.status) &&
      (!filters.origin || flight.origin.code === filters.origin) &&
      (!filters.destination ||
        flight.destination.code === filters.destination)
    );
  }
}