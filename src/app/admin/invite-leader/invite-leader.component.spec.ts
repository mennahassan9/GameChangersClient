import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteLeaderComponent } from './invite-leader.component';

describe('InviteLeaderComponent', () => {
  let component: InviteLeaderComponent;
  let fixture: ComponentFixture<InviteLeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
