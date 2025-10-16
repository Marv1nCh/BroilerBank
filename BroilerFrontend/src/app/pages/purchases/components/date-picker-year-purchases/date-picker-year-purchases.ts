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

const moment = _rollupMoment || _moment;

export const MY_FORMATS_YEAR = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-date-picker-year-purchases',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './date-picker-year-purchases.html',
  styleUrl: './date-picker-year-purchases.scss',
  providers: [
    { provide: MAT_DATE_RANGE_SELECTION_STRATEGY, useClass: DateRangeService },
    provideMomentDateAdapter(MY_FORMATS_YEAR),
  ],
})
export class DatePickerYearPurchases {
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

  setYear(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();

    const year = this.date.value?.toDate()!.getFullYear()!;

    const start = new Date(year, 0, 1);
    const end = new Date(year + 1, 0, 0);

    this.filteredPurchases.emit(
      this.originalPurchases().filter((x) => {
        const purchaseDate = new Date(x.date);
        return isBefore(purchaseDate, end) && isAfter(purchaseDate, start);
      })
    );
    this.filterIndicator.emit(DatePickerEnum.YEAR_DATEPICKER);
  }

  clear = () => this.date.setValue(null);
}
