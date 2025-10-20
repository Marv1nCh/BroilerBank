import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductDialog } from './add-product-dialog';

describe('AddProductDialog', () => {
  let component: AddProductDialog;
  let fixture: ComponentFixture<AddProductDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
