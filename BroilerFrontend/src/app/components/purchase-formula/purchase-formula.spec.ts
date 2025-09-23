import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseFormula } from './purchase-formula';

describe('PurchaseFormula', () => {
  let component: PurchaseFormula;
  let fixture: ComponentFixture<PurchaseFormula>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseFormula]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseFormula);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
