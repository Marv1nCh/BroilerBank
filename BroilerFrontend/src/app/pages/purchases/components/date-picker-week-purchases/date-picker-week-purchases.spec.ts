import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerWeekPurchases } from './date-picker-week-purchases';

describe('DatePickerWeekPurchases', () => {
  let component: DatePickerWeekPurchases;
  let fixture: ComponentFixture<DatePickerWeekPurchases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerWeekPurchases]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerWeekPurchases);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
