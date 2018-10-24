import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalyzerConfigurationComponent } from './metalyzer-configuration.component';

describe('MetalyzerConfigurationComponent', () => {
  let component: MetalyzerConfigurationComponent;
  let fixture: ComponentFixture<MetalyzerConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetalyzerConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalyzerConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
