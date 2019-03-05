import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocHeaderComponent } from './adhoc-header.component';

describe('AdhocHeaderComponent', () => {
  let component: AdhocHeaderComponent;
  let fixture: ComponentFixture<AdhocHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
