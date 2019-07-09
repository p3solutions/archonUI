import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtCloneViewComponent } from './ert-clone-view.component';

describe('ErtCloneViewComponent', () => {
  let component: ErtCloneViewComponent;
  let fixture: ComponentFixture<ErtCloneViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErtCloneViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtCloneViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
