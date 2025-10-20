import { Component, effect, input, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerModule,
  MatDateRangeInput,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateRangeService } from '../../../../services/date-range-service';
import { Purchase } from '../../../../model/purchase.type';
import { isAfter, isBefore } from '../../../../shared/utils';
import { DatePickerEnum } from '../../../../shared/enums';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-date-picker-week-purchases',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatDateRangeInput,
    MatDateRangePicker,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule
  ],
  templateUrl: './date-picker-week-purchases.html',
  styleUrl: './date-picker-week-purchases.scss',
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DateRangeService,
    },
  ],
})
export class DatePickerWeekPurchases {
  purchases = input.required<Array<Purchase>>();
  readonly originalPurchases = signal<Array<Purchase>>([]);

  filteredPurchases = output<Array<Purchase>>();
  filterIndicator = output<DatePickerEnum>();

  filterByWeekStartControl = new FormControl<Date | null>(null);
  filterByWeekEndControl = new FormControl<Date | null>(null);

  constructor() {
    effect(() => {
      const incoming = this.purchases();
      if (incoming?.length) {
        this.originalPurchases.set([...incoming]);
      }
    });
  }

  onWeekChange() {
    const start = this.filterByWeekStartControl.value;
    const end = this.filterByWeekEndControl.value;

    if (start && end) {
      this.filteredPurchases.emit(
        this.originalPurchases().filter((x) => {
          const purchaseDate = new Date(x.date);
          return isBefore(purchaseDate, end) && isAfter(purchaseDate, start);
        })
      );
      this.filterIndicator.emit(DatePickerEnum.WEEK_DATEPICKER);
    }
  }

  clear() {
    this.filterByWeekStartControl.setValue(null);
    this.filterByWeekEndControl.setValue(null);
  }
}
