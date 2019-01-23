import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredProcViewComponent } from './stored-proc-view.component';

describe('StoredProcViewComponent', () => {
  let component: StoredProcViewComponent;
  let fixture: ComponentFixture<StoredProcViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoredProcViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoredProcViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
