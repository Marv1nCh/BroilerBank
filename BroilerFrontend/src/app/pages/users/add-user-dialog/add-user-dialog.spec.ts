import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserDialog } from './add-user-dialog';

describe('AddUserDialog', () => {
  let component: AddUserDialog;
  let fixture: ComponentFixture<AddUserDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
