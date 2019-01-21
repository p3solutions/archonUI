import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbExtractorComponent } from './db-extractor.component';

describe('DbExtractorComponent', () => {
  let component: DbExtractorComponent;
  let fixture: ComponentFixture<DbExtractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbExtractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbExtractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
