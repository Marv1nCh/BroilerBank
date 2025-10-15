import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerYear } from './date-picker-year';

describe('DatePickerYear', () => {
  let component: DatePickerYear;
  let fixture: ComponentFixture<DatePickerYear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerYear]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerYear);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
