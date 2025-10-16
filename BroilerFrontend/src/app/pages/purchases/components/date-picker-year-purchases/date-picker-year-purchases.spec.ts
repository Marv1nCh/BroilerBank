import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerYearPurchases } from './date-picker-year-purchases';

describe('DatePickerYearPurchases', () => {
  let component: DatePickerYearPurchases;
  let fixture: ComponentFixture<DatePickerYearPurchases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerYearPurchases]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerYearPurchases);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
