import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCard } from './filter-card';

describe('FilterCard', () => {
  let component: FilterCard;
  let fixture: ComponentFixture<FilterCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
