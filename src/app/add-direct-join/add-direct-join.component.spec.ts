import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDirectJoinComponent } from './add-direct-join.component';

describe('AddDirectJoinComponent', () => {
  let component: AddDirectJoinComponent;
  let fixture: ComponentFixture<AddDirectJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDirectJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDirectJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
