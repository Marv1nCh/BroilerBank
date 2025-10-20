import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseDialog } from './add-purchase-dialog';

describe('AddPurchaseDialog', () => {
  let component: AddPurchaseDialog;
  let fixture: ComponentFixture<AddPurchaseDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPurchaseDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPurchaseDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
