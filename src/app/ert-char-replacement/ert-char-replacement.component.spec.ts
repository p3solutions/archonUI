import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtCharReplacementComponent } from './ert-char-replacement.component';

describe('ErtCharReplacementComponent', () => {
  let component: ErtCharReplacementComponent;
  let fixture: ComponentFixture<ErtCharReplacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErtCharReplacementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtCharReplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
