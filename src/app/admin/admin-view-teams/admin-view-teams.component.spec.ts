import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewTeamsComponent } from './admin-view-teams.component';

describe('AdminViewTeamsComponent', () => {
  let component: AdminViewTeamsComponent;
  let fixture: ComponentFixture<AdminViewTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
