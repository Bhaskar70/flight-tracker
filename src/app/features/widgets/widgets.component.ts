import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FlightService } from '../../core/service/flight-service';

@Component({
  selector: 'app-widgets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent {
  private readonly flightService = inject(FlightService);

  readonly stats$ = this.flightService.stats$;
}