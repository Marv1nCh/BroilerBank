import { Component, effect, input, model, output, signal, ViewChild } from '@angular/core';
import { DatePickerWeek } from '../date-picker-week/date-picker-week';
import { DatePickerMonth } from '../date-picker-month/date-picker-month';
import { DatePickerYear } from '../date-picker-year/date-picker-year';
import { MatCard } from '@angular/material/card';
import { Leaderboard } from '../../../../model/leaderboard.type';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-card',
  imports: [
    DatePickerWeek,
    DatePickerMonth,
    DatePickerYear,
    MatCard,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './filter-card.html',
  styleUrl: './filter-card.scss',
})
export class FilterCard {
  leaderboard = input.required<Array<Leaderboard>>();
  readonly fullLeaderboard = signal<Array<Leaderboard>>([]);

  filteredChange = output<Array<Leaderboard>>();
  isClearFilters = output<boolean>();
  searchedByContent = output<Array<Leaderboard>>();

  searchContent = '';

  @ViewChild('weekPicker') weekPicker?: DatePickerWeek;
  @ViewChild('monthPicker') monthPicker?: DatePickerMonth;
  @ViewChild('yearPicker') yearPicker?: DatePickerYear;

  constructor() {
    effect(() => {
      const incoming = this.leaderboard();
      if (incoming?.length) {
        this.fullLeaderboard.set([...incoming]);
      }
    });
  }

  onFilteredChange(filteredChange: Array<Leaderboard>) {
    this.filteredChange.emit(filteredChange);
  }

  clearFilters() {
    this.weekPicker?.clear();
    this.monthPicker?.clear();
    this.yearPicker?.clear();
    
    this.searchContent = ''
    this.onSearch()

    this.isClearFilters.emit(true);
  }

  onSearch() {
    this.searchedByContent.emit(
      this.fullLeaderboard().filter((x) => {
        const isInGivenName = x.givenName.toLowerCase().indexOf(this.searchContent) != -1;
        const isInSurname = x.surname.toLocaleLowerCase().indexOf(this.searchContent) != -1;
        const isInNumberOfPurchases =
          x.numberOfPurchases.toString().indexOf(this.searchContent) != -1;
        const isInCompletePrice = x.completePrice.toString().indexOf(this.searchContent) != -1;

        return isInGivenName || isInSurname || isInNumberOfPurchases || isInCompletePrice;
      })
    );
  }
}
