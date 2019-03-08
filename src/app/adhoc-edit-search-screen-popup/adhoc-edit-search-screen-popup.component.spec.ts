import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocEditSearchScreenPopupComponent } from './adhoc-edit-search-screen-popup.component';

describe('AdhocEditSearchScreenPopupComponent', () => {
  let component: AdhocEditSearchScreenPopupComponent;
  let fixture: ComponentFixture<AdhocEditSearchScreenPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocEditSearchScreenPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocEditSearchScreenPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
