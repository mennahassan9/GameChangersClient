import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmailDomainComponent } from './admin-email-domain.component';

describe('AdminEmailDomainComponent', () => {
  let component: AdminEmailDomainComponent;
  let fixture: ComponentFixture<AdminEmailDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmailDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmailDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
