import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeIdeaComponent } from './judge-idea.component';

describe('JudgeIdeaComponent', () => {
  let component: JudgeIdeaComponent;
  let fixture: ComponentFixture<JudgeIdeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeIdeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
