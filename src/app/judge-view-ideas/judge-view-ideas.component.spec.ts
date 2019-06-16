import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeViewIdeasComponent } from './judge-view-ideas.component';

describe('JudgeViewIdeasComponent', () => {
  let component: JudgeViewIdeasComponent;
  let fixture: ComponentFixture<JudgeViewIdeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeViewIdeasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeViewIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
