import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Purchase } from '../../../model/purchase.type';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-date-range-filter',
  imports: [
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './date-filter.html',
  styleUrl: './date-filter.scss',
})
export class DateRangeFilter {
  purchases = input.required<Array<Purchase>>();
  filteredPurchases = output<Array<Purchase>>();

  startDate: Date | null = null;
  endDate: Date | null = null;

  applyDateRangeFilter(): void {
    const start = this.startDate ? this.startDate.toISOString() : '';
    const end = this.endDate ? this.endDate.toISOString() : '';
    this.filteredPurchases.emit(this.filterByDate(start, end));
  }

  filterByDate(start: string, end: string): Array<Purchase> {
    var newPurchases: Array<Purchase> = [];

    const startDate = new Date(start);
    const endDate = new Date(end);

    this.purchases().forEach((purchase) => {
      const purchaseDate = new Date(purchase.date);
      if (this.isBefore(purchaseDate, endDate) && this.isAfter(purchaseDate, startDate)) {
        newPurchases.push(purchase);
      }
    });
    
    return newPurchases;
  }

  isBefore(date: Date, dateToCompare: Date): boolean {
    if (date.getFullYear() > dateToCompare.getFullYear()) {
      return false;
    } else if (date.getMonth() > dateToCompare.getMonth()) {
      return false;
    } else if (date.getDay() > dateToCompare.getDay()) {
      return false;
    }
    return true;
  }

  isAfter(date: Date, dateToCompare: Date): boolean {
    if (date.getFullYear() < dateToCompare.getFullYear()) {
      return false;
    } else if (date.getMonth() < dateToCompare.getMonth()) {
      return false;
    } else if (date.getDay() < dateToCompare.getDay()) {
      return false;
    }
    return true;
  }

  clearDateFilter() {
    this.startDate = null;
    this.endDate = null;
    this.applyDateRangeFilter();
  }
}
