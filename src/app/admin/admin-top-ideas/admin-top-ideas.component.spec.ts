import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopIdeasComponent } from './admin-top-ideas.component';

describe('AdminTopIdeasComponent', () => {
  let component: AdminTopIdeasComponent;
  let fixture: ComponentFixture<AdminTopIdeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTopIdeasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTopIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
