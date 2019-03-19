import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocHeaderComponent } from './adhoc-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserinfoService } from '../userinfo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdhocHeaderComponent', () => {
  let component: AdhocHeaderComponent;
  let fixture: ComponentFixture<AdhocHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocHeaderComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [UserinfoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocHeaderComponent);
    component = fixture.componentInstance;
    spyOn(component.router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
