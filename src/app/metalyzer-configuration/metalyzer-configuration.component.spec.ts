import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalyzerConfigurationComponent } from './metalyzer-configuration.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MetalyzerHeaderService } from '../metalyzer-header/metalyzer-header.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { TableListService } from '../table-list/table-list.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('MetalyzerConfigurationComponent', () => {
  let component: MetalyzerConfigurationComponent;
  let fixture: ComponentFixture<MetalyzerConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetalyzerConfigurationComponent ],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [MetalyzerHeaderService, UserinfoService, TableListService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
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
