import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalyzerLiveComponent } from './metalyzer-live.component';

describe('MetalyzerLiveComponent', () => {
  let component: MetalyzerLiveComponent;
  let fixture: ComponentFixture<MetalyzerLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetalyzerLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalyzerLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
