import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewUserComponent } from './admin-view-user.component';

describe('AdminViewUserComponent', () => {
  let component: AdminViewUserComponent;
  let fixture: ComponentFixture<AdminViewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
