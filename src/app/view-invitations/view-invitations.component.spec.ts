import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvitationsComponent } from './view-invitations.component';

describe('ViewInvitationsComponent', () => {
  let component: ViewInvitationsComponent;
  let fixture: ComponentFixture<ViewInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
