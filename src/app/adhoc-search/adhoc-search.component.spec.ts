import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocSearchComponent } from './adhoc-search.component';

describe('AdhocSearchComponent', () => {
  let component: AdhocSearchComponent;
  let fixture: ComponentFixture<AdhocSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
