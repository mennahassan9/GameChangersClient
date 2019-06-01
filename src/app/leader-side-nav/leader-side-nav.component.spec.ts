import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderSideNavComponent } from './leader-side-nav.component';

describe('LeaderSideNavComponent', () => {
  let component: LeaderSideNavComponent;
  let fixture: ComponentFixture<LeaderSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
