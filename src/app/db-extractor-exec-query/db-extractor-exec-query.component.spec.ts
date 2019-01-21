import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbExtractorExecQueryComponent } from './db-extractor-exec-query.component';

describe('DbExtractorExecQueryComponent', () => {
  let component: DbExtractorExecQueryComponent;
  let fixture: ComponentFixture<DbExtractorExecQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbExtractorExecQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbExtractorExecQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
