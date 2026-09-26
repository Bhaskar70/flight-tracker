import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { WidgetsComponent } from '../widgets/widgets.component';
import { FlightMapComponent } from '../flight-map/flight-map.component';
import { FlightFiltersComponent } from '../flight-filters/flight-filters.component';
import { FlightTableComponent } from '../flight-table/flight-table.component';

@Component({
  imports: [NavbarComponent, WidgetsComponent, FlightMapComponent, FlightFiltersComponent, FlightTableComponent],
  selector: 'app-dashboard',
  styleUrl: './dashboard.component.scss',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
