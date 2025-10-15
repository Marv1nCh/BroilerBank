import { Component, inject, OnInit, output } from '@angular/core';
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
import { LeaderboardFilterService } from '../../../../services/leaderborad-filter-service';
import { Leaderboard } from '../../../../model/leaderboard.type';

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
  selector: 'app-date-picker-year',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './date-picker-year.html',
  styleUrl: './date-picker-year.scss',
  providers: [
    { provide: MAT_DATE_RANGE_SELECTION_STRATEGY, useClass: DateRangeService },
    provideMomentDateAdapter(MY_FORMATS_YEAR),
  ],
})
export class DatePickerYear {
  readonly date = new FormControl<Moment | null>(null);

  leaderboardFilterService = inject(LeaderboardFilterService);

  filteredListOutput = output<Array<Leaderboard>>();

  setYear(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();

    this.leaderboardFilterService
      .filterLeaderboardByYear(this.date.value!.toDate())
      .subscribe((result) => this.filteredListOutput.emit(result));
  }

  clear() {
    this.date.setValue(null);
  }
}
