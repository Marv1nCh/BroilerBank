import { Component, inject, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { default as _rollupMoment, Moment } from 'moment';
import * as _moment from 'moment';
import { DateRangeService } from '../../../../services/date-range-service';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { LeaderboardFilterService } from '../../../../services/leaderborad-filter-service';
import { Leaderboard } from '../../../../model/leaderboard.type';

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
  selector: 'app-date-picker-month',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './date-picker-month.html',
  styleUrl: './date-picker-month.scss',
  providers: [
    { provide: MAT_DATE_RANGE_SELECTION_STRATEGY, useClass: DateRangeService },
    provideMomentDateAdapter(MY_FORMATS_MONTH),
  ],
})
export class DatePickerMonth {
  readonly date = new FormControl<Moment | null>(null);

  leaderboardFilterService = inject(LeaderboardFilterService);

  filteredListOutput = output<Array<Leaderboard>>();

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();

    this.leaderboardFilterService
      .filterLeaderboardByMonth(this.date.value!.toDate())
      .subscribe((result) => {
        this.filteredListOutput.emit(result);
      });
  }

  clear() {
    this.date.setValue(null);
  }
}
