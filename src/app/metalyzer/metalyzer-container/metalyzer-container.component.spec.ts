import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalyzerContainerComponent } from './metalyzer-container.component';

describe('MetalyzerContainerComponent', () => {
  let component: MetalyzerContainerComponent;
  let fixture: ComponentFixture<MetalyzerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetalyzerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalyzerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
