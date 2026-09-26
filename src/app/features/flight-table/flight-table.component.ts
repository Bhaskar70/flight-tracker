import {
  AfterViewInit,
  Component,
  DestroyRef,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Flight } from '../../core/models/mock';
import { FlightService } from '../../core/service/flight-service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-flight-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  templateUrl: './flight-table.component.html',
  styleUrls: ['./flight-table.component.scss']
})
export class FlightTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private readonly flightService = inject(FlightService);
  private readonly destroyRef = inject(DestroyRef);

  readonly dataSource = new MatTableDataSource<Flight>([]);

  readonly displayedColumns = [
    'flightNumber',
    'callsign',
    'aircraft',
    'origin',
    'destination',
    'status',
    'departure',
    'arrival',
  ];


  constructor() {
    this.flightService.flights$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((flights) => {
        this.dataSource.data = flights;
        this.paginator?.firstPage();
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}