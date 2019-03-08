import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocSearchScreenComponent } from './adhoc-search-screen.component';

describe('AdhocSearchScreenComponent', () => {
  let component: AdhocSearchScreenComponent;
  let fixture: ComponentFixture<AdhocSearchScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocSearchScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocSearchScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
