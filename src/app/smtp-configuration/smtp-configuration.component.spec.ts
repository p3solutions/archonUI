import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpConfigurationComponent } from './smtp-configuration.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableListService } from '../table-list/table-list.service';
import { UserinfoService } from '../userinfo.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('SmtpConfigurationComponent', () => {
  let component: SmtpConfigurationComponent;
  let fixture: ComponentFixture<SmtpConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmtpConfigurationComponent ],
      imports: [RouterTestingModule, FormsModule,
        ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule,
        RouterTestingModule, HttpClientTestingModule, MatCardModule],
        providers: [
          TableListService,
          UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmtpConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
