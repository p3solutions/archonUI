import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtLandingPageComponent } from './ert-landing-page.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';

describe('ErtLandingPageComponent', () => {
  let component: ErtLandingPageComponent;
  let fixture: ComponentFixture<ErtLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErtLandingPageComponent],
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [UserinfoService, WorkspaceHeaderService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
