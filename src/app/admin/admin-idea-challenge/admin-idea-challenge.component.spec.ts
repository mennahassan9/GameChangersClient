import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIdeaChallengeComponent } from './admin-idea-challenge.component';

describe('AdminIdeaChallengeComponent', () => {
  let component: AdminIdeaChallengeComponent;
  let fixture: ComponentFixture<AdminIdeaChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIdeaChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIdeaChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
