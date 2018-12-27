import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalyzerResultScreenComponent } from './data-analyzer-result-screen.component';

describe('DataAnalyzerResultScreenComponent', () => {
  let component: DataAnalyzerResultScreenComponent;
  let fixture: ComponentFixture<DataAnalyzerResultScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAnalyzerResultScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAnalyzerResultScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
