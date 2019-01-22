import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbExtractorStepOneComponent } from './db-extractor-step-one.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';

describe('DbExtractorStepOneComponent', () => {
  let component: DbExtractorStepOneComponent;
  let fixture: ComponentFixture<DbExtractorStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbExtractorStepOneComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [UserinfoService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbExtractorStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
