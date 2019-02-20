import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtSipConfigComponent } from './ert-sip-config.component';

describe('ErtSipConfigComponent', () => {
  let component: ErtSipConfigComponent;
  let fixture: ComponentFixture<ErtSipConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErtSipConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtSipConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
