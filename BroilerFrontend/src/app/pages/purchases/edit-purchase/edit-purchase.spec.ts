import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchase } from './edit-purchase';

describe('EditPurchase', () => {
  let component: EditPurchase;
  let fixture: ComponentFixture<EditPurchase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPurchase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPurchase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
