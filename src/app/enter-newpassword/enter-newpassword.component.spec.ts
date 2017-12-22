import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterNewpasswordComponent } from './enter-newpassword.component';

describe('EnterNewpasswordComponent', () => {
  let component: EnterNewpasswordComponent;
  let fixture: ComponentFixture<EnterNewpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterNewpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterNewpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
