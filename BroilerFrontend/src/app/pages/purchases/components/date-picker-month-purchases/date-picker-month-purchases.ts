import { Component, effect, input, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { default as _rollupMoment, Moment } from 'moment';
import * as _moment from 'moment';
import { DateRangeService } from '../../../../services/date-range-service';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { Purchase } from '../../../../model/purchase.type';
import { isAfter, isBefore } from '../../../../shared/utils';
import { DatePickerEnum } from '../../../../shared/enums';
import { MatIconModule } from '@angular/material/icon';

const moment = _rollupMoment || _moment;

export const MY_FORMATS_MONTH = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-date-picker-month-purchases',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './date-picker-month-purchases.html',
  styleUrl: './date-picker-month-purchases.scss',
  providers: [
    { provide: MAT_DATE_RANGE_SELECTION_STRATEGY, useClass: DateRangeService },
    provideMomentDateAdapter(MY_FORMATS_MONTH),
  ],
})
export class DatePickerMonthPurchases {
  purchases = input.required<Array<Purchase>>();
  readonly originalPurchases = signal<Array<Purchase>>([]);

  filteredPurchases = output<Array<Purchase>>();
  filterIndicator = output<DatePickerEnum>();

  readonly date = new FormControl<Moment | null>(null);

  constructor() {
    effect(() => {
      const incoming = this.purchases();
      if (incoming?.length) {
        this.originalPurchases.set([...incoming]);
      }
    });
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();

    const currentlySelectedDate = this.date.value?.toDate()!;
    const year = currentlySelectedDate.getFullYear();
    const month = currentlySelectedDate.getMonth();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    const start = new Date(year, month, 1);
    const end = new Date(year, month, lastDayOfMonth);

    this.filteredPurchases.emit(
      this.originalPurchases().filter((x) => {
        const purchaseDate = new Date(x.date);
        return isBefore(purchaseDate, end) && isAfter(purchaseDate, start);
      })
    );
    this.filterIndicator.emit(DatePickerEnum.MONTH_DATEPICKER);
  }

  clear = () => this.date.setValue(null);
}
