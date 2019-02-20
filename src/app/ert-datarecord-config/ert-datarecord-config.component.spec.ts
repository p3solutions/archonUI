import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtDatarecordConfigComponent } from './ert-datarecord-config.component';

describe('ErtDatarecordConfigComponent', () => {
  let component: ErtDatarecordConfigComponent;
  let fixture: ComponentFixture<ErtDatarecordConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErtDatarecordConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtDatarecordConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
