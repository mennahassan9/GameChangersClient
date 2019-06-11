import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteJudgeComponent } from './invite-judge.component';

describe('InviteJudgeComponent', () => {
  let component: InviteJudgeComponent;
  let fixture: ComponentFixture<InviteJudgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteJudgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteJudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
