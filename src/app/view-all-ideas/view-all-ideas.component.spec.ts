import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllIdeasComponent } from './view-all-ideas.component';

describe('ViewAllIdeasComponent', () => {
  let component: ViewAllIdeasComponent;
  let fixture: ComponentFixture<ViewAllIdeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllIdeasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
