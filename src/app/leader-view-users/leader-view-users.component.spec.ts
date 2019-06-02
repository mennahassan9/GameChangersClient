import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderViewUsersComponent } from './leader-view-users.component';

describe('LeaderViewUsersComponent', () => {
  let component: LeaderViewUsersComponent;
  let fixture: ComponentFixture<LeaderViewUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderViewUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderViewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
