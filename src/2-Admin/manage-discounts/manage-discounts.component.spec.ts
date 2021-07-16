import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDiscountsComponent } from './manage-discounts.component';

describe('ManageDiscountsComponent', () => {
  let component: ManageDiscountsComponent;
  let fixture: ComponentFixture<ManageDiscountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDiscountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
