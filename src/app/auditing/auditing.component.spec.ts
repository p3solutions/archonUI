import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditingComponent } from './auditing.component';

describe('AuditingComponent', () => {
  let component: AuditingComponent;
  let fixture: ComponentFixture<AuditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
