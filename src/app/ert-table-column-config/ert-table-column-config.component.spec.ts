import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtTableColumnConfigComponent } from './ert-table-column-config.component';

describe('ErtTableColumnConfigComponent', () => {
  let component: ErtTableColumnConfigComponent;
  let fixture: ComponentFixture<ErtTableColumnConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErtTableColumnConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtTableColumnConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
