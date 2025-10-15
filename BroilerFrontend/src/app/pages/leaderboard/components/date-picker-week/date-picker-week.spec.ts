import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerWeek } from './date-picker-week';

describe('DatePickerWeek', () => {
  let component: DatePickerWeek;
  let fixture: ComponentFixture<DatePickerWeek>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerWeek]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerWeek);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
