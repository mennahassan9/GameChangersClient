import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeControlComponent } from './judge-control.component';

describe('JudgeControlComponent', () => {
  let component: JudgeControlComponent;
  let fixture: ComponentFixture<JudgeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
