import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbExtractorStepOneComponent } from './db-extractor-step-one.component';

describe('DbExtractorStepOneComponent', () => {
  let component: DbExtractorStepOneComponent;
  let fixture: ComponentFixture<DbExtractorStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbExtractorStepOneComponent ]
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
