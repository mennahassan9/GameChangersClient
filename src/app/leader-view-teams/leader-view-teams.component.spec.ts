import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderViewTeamsComponent } from './leader-view-teams.component';

describe('LeaderViewTeamsComponent', () => {
  let component: LeaderViewTeamsComponent;
  let fixture: ComponentFixture<LeaderViewTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderViewTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderViewTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
