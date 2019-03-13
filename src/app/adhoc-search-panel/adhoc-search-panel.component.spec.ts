import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocSearchPanelComponent } from './adhoc-search-panel.component';

describe('AdhocSearchPanelComponent', () => {
  let component: AdhocSearchPanelComponent;
  let fixture: ComponentFixture<AdhocSearchPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
