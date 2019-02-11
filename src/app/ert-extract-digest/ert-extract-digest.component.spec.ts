import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtExtractDigestComponent } from './ert-extract-digest.component';

describe('ErtExtractDigestComponent', () => {
  let component: ErtExtractDigestComponent;
  let fixture: ComponentFixture<ErtExtractDigestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErtExtractDigestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtExtractDigestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
