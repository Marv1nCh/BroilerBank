import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormula } from './user-formula';

describe('UserFormula', () => {
  let component: UserFormula;
  let fixture: ComponentFixture<UserFormula>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormula]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormula);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
