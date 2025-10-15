import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { DateRange, MatDateRangeSelectionStrategy } from '@angular/material/datepicker';

@Injectable({
  providedIn: 'root',
})
export class DateRangeService<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null, _currentRange: DateRange<D>, _event: Event): DateRange<D> {
    return this.createWeekRange(date);
  }
  createPreview(activeDate: D | null, _currentRange: DateRange<D>, _event: Event): DateRange<D> {
    return this.createWeekRange(activeDate);
  }

  private createWeekRange(date: D | null) {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -0);
      const end = this._dateAdapter.addCalendarDays(date, 6);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}
