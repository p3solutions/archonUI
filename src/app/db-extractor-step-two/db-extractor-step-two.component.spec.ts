import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbExtractorStepTwoComponent } from './db-extractor-step-two.component';

describe('DbExtractorStepTwoComponent', () => {
  let component: DbExtractorStepTwoComponent;
  let fixture: ComponentFixture<DbExtractorStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbExtractorStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbExtractorStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
