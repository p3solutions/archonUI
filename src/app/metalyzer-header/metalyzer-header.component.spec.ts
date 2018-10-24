import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalyzerHeaderComponent } from './metalyzer-header.component';

describe('MetalyzerHeaderComponent', () => {
  let component: MetalyzerHeaderComponent;
  let fixture: ComponentFixture<MetalyzerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetalyzerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalyzerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
