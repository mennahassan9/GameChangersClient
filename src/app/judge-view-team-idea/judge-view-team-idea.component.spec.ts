import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeViewTeamIdeaComponent } from './judge-view-team-idea.component';

describe('JudgeViewTeamIdeaComponent', () => {
  let component: JudgeViewTeamIdeaComponent;
  let fixture: ComponentFixture<JudgeViewTeamIdeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeViewTeamIdeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeViewTeamIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
