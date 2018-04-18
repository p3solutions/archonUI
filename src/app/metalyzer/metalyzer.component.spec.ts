import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalyzerComponent } from './metalyzer.component';

describe('MetalyzerComponent', () => {
  let component: MetalyzerComponent;
  let fixture: ComponentFixture<MetalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetalyzerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
