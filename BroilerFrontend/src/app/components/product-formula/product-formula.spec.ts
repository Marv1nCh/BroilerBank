import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormula } from './product-formula';

describe('ProductFormula', () => {
  let component: ProductFormula;
  let fixture: ComponentFixture<ProductFormula>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormula]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFormula);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
