import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocSearchCriteriaComponent } from './adhoc-search-criteria.component';

describe('AdhocSearchCriteriaComponent', () => {
  let component: AdhocSearchCriteriaComponent;
  let fixture: ComponentFixture<AdhocSearchCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocSearchCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocSearchCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
