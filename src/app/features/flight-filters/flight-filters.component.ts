import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DEFAULT_FILTERS, FlightService } from '../../core/service/flight-service';


@Component({
  selector: 'app-flight-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flight-filters.component.html',
  styleUrls: ['./flight-filters.component.scss']
})
export class FlightFiltersComponent {
  private readonly flightService = inject(FlightService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly airports = this.flightService.airports;

  readonly filterForm = this.formBuilder.nonNullable.group(
    this.flightService.currentFilters
  );

  constructor() {
    this.filterForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.flightService.setFilters(this.filterForm.getRawValue());
      });
  }

  resetFilters(): void {
    this.filterForm.reset({ ...DEFAULT_FILTERS });
  }
}