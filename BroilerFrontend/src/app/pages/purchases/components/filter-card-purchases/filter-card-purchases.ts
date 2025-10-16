import { Component, effect, input, output, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DatePickerMonthPurchases } from '../date-picker-month-purchases/date-picker-month-purchases';
import { DatePickerYearPurchases } from '../date-picker-year-purchases/date-picker-year-purchases';
import { DatePickerWeekPurchases } from '../date-picker-week-purchases/date-picker-week-purchases';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Purchase } from '../../../../model/purchase.type';
import { DatePickerWeek } from '../../../leaderboard/components/date-picker-week/date-picker-week';
import { DatePickerMonth } from '../../../leaderboard/components/date-picker-month/date-picker-month';
import { DatePickerYear } from '../../../leaderboard/components/date-picker-year/date-picker-year';
import { DatePickerEnum } from '../../../../shared/enums';

@Component({
  selector: 'app-filter-card-purchases',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    DatePickerMonthPurchases,
    DatePickerYearPurchases,
    DatePickerWeekPurchases,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './filter-card-purchases.html',
  styleUrl: './filter-card-purchases.scss',
})
export class FilterCardPurchases {
  purchases = input.required<Array<Purchase>>();
  readonly originalPurchases = signal<Array<Purchase>>([]);

  alteredPurchaseList = output<Array<Purchase>>();

  searchContent = '';

  @ViewChild('weekPicker') weekPicker?: DatePickerWeek;
  @ViewChild('monthPicker') monthPicker?: DatePickerMonth;
  @ViewChild('yearPicker') yearPicker?: DatePickerYear;

  constructor() {
    effect(() => {
      const incoming = this.purchases();
      if (incoming?.length) {
        this.originalPurchases.set([...incoming]);
      }
    });
  }

  onSearch() {
    this.alteredPurchaseList.emit(
      this.originalPurchases().filter((x) => {
        const searchedContent = this.searchContent.toLocaleLowerCase();

        const name = x.givenName.toLocaleLowerCase() + ' ' + x.surname.toLocaleLowerCase();
        const isInName = name.indexOf(searchedContent) != -1;
        const isInDate = x.date.toLocaleLowerCase().indexOf(searchedContent) != -1;
        const isInProducts = x.products.some(
          (ele) => ele.toLocaleLowerCase().indexOf(searchedContent) != -1
        );
        const isInPrice = x.price.toString().toLocaleLowerCase().indexOf(searchedContent) != -1;

        return isInName || isInDate || isInProducts || isInPrice;
      })
    );
  }

  clearFilters() {
    this.weekPicker?.clear();
    this.monthPicker?.clear();
    this.yearPicker?.clear();

    this.searchContent = '';
    this.onSearch();
  }

  onFilter = (newPurchases: Array<Purchase>) => this.alteredPurchaseList.emit(newPurchases);

  clearOtherFilters(datePicker: DatePickerEnum) {
    const pickers = {
      [DatePickerEnum.WEEK_DATEPICKER]: [this.monthPicker, this.yearPicker],
      [DatePickerEnum.MONTH_DATEPICKER]: [this.weekPicker, this.yearPicker],
      [DatePickerEnum.YEAR_DATEPICKER]: [this.weekPicker, this.monthPicker],
    };

    pickers[datePicker]?.forEach((picker) => picker?.clear());
  }
}
