import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerMonth } from './date-picker-month';

describe('DatePickerMonth', () => {
  let component: DatePickerMonth;
  let fixture: ComponentFixture<DatePickerMonth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerMonth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerMonth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
