import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewUserIdeaComponent } from './admin-view-user-idea.component';

describe('AdminViewUserIdeaComponent', () => {
  let component: AdminViewUserIdeaComponent;
  let fixture: ComponentFixture<AdminViewUserIdeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewUserIdeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewUserIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
