import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDirectJoinComponent } from './add-direct-join.component';
import { AddDirectJoinService } from './add-direct-join.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';

describe('AddDirectJoinComponent', () => {
  let component: AddDirectJoinComponent;
  let fixture: ComponentFixture<AddDirectJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddDirectJoinComponent],
      providers: [AddDirectJoinService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDirectJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
