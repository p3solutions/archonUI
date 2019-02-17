import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtJobsConfigComponent } from './ert-jobs-config.component';
import { ErtService } from '../ert-landing-page/ert.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';

describe('ErtJobsConfigComponent', () => {
  let component: ErtJobsConfigComponent;
  let fixture: ComponentFixture<ErtJobsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErtJobsConfigComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [ErtService, UserinfoService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtJobsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
