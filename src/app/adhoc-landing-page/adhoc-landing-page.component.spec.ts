import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocLandingPageComponent } from './adhoc-landing-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserinfoService } from '../userinfo.service';

describe('AdhocLandingPageComponent', () => {
  let component: AdhocLandingPageComponent;
  let fixture: ComponentFixture<AdhocLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocLandingPageComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [UserinfoService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
