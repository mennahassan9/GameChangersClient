import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewUserTeamComponent } from './admin-view-user-team.component';

describe('AdminViewUserTeamComponent', () => {
  let component: AdminViewUserTeamComponent;
  let fixture: ComponentFixture<AdminViewUserTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewUserTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewUserTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
