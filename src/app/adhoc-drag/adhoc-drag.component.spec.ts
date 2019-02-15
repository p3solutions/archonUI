import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocDragComponent } from './adhoc-drag.component';

describe('AdhocDragComponent', () => {
  let component: AdhocDragComponent;
  let fixture: ComponentFixture<AdhocDragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocDragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
