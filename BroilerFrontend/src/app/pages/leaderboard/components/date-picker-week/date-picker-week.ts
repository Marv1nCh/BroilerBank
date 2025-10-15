import { Component, inject, output } from '@angular/core';
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
import { LeaderboardFilterService } from '../../../../services/leaderborad-filter-service';
import { Leaderboard } from '../../../../model/leaderboard.type';
import { DateRangeService } from '../../../../services/date-range-service';

@Component({
  selector: 'app-date-picker-week',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatDateRangeInput,
    MatDateRangePicker,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './date-picker-week.html',
  styleUrl: './date-picker-week.scss',
    providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DateRangeService,
    },
  ],
})
export class DatePickerWeek {
  filterByWeekStartControl = new FormControl<Date | null>(null);
  filterByWeekEndControl = new FormControl<Date | null>(null);

  filteredListOutput = output<Array<Leaderboard>>();

  leaderboardFilterService = inject(LeaderboardFilterService);

  onWeekChange() {
    const start = this.filterByWeekStartControl.value;
    const end = this.filterByWeekEndControl.value;

    if (start && end) {
      this.leaderboardFilterService
        .filterLeaderboardByWeek(start, end)
        .subscribe((result) => this.filteredListOutput.emit(result));
    }
  }

  clear() {
    this.filterByWeekStartControl.setValue(null)
    this.filterByWeekEndControl.setValue(null)
  }
}
