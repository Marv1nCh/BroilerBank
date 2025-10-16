import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCardPurchases } from './filter-card-purchases';

describe('FilterCardPurchases', () => {
  let component: FilterCardPurchases;
  let fixture: ComponentFixture<FilterCardPurchases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterCardPurchases]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterCardPurchases);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
