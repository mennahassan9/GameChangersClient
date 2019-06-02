import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderDashboardComponent } from './leader-dashboard.component';

describe('LeaderDashboardComponent', () => {
  let component: LeaderDashboardComponent;
  let fixture: ComponentFixture<LeaderDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
