import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewIdeasComponent } from './admin-view-ideas.component';
import {NG_TABLE_DIRECTIVES} from 'ng2-table';

describe('AdminViewIdeasComponent', () => {
  let component: AdminViewIdeasComponent;
  let fixture: ComponentFixture<AdminViewIdeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewIdeasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
