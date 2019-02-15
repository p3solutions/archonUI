import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtDatarecordFinalComponent } from './ert-datarecord-final.component';

describe('ErtDatarecordFinalComponent', () => {
  let component: ErtDatarecordFinalComponent;
  let fixture: ComponentFixture<ErtDatarecordFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErtDatarecordFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtDatarecordFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
