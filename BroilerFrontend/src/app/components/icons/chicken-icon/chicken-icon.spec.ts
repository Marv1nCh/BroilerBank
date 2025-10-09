import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChickenIcon } from './chicken-icon';

describe('ChickenIcon', () => {
  let component: ChickenIcon;
  let fixture: ComponentFixture<ChickenIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChickenIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(ChickenIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
