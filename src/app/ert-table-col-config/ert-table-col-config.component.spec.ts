import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtTableColConfigComponent } from './ert-table-col-config.component';

describe('ErtTableColConfigComponent', () => {
  let component: ErtTableColConfigComponent;
  let fixture: ComponentFixture<ErtTableColConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErtTableColConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtTableColConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
