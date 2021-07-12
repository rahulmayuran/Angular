import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleFlightsComponent } from './schedule-flights.component';

describe('ScheduleFlightsComponent', () => {
  let component: ScheduleFlightsComponent;
  let fixture: ComponentFixture<ScheduleFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleFlightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
