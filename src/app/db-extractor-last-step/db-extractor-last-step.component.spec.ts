import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbExtractorLastStepComponent } from './db-extractor-last-step.component';

describe('DbExtractorLastStepComponent', () => {
  let component: DbExtractorLastStepComponent;
  let fixture: ComponentFixture<DbExtractorLastStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbExtractorLastStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbExtractorLastStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
