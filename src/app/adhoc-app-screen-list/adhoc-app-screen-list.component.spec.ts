import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocAppScreenListComponent } from './adhoc-app-screen-list.component';

describe('AdhocAppScreenListComponent', () => {
  let component: AdhocAppScreenListComponent;
  let fixture: ComponentFixture<AdhocAppScreenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdhocAppScreenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhocAppScreenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
