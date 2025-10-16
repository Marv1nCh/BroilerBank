import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerMonthPurchases } from './date-picker-month-purchases';

describe('DatePickerMonthPurchases', () => {
  let component: DatePickerMonthPurchases;
  let fixture: ComponentFixture<DatePickerMonthPurchases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerMonthPurchases]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerMonthPurchases);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
