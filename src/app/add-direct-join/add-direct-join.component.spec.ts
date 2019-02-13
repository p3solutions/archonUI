import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDirectJoinComponent } from './add-direct-join.component';
import { AddDirectJoinService } from './add-direct-join.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddDirectJoinComponent', () => {
  let component: AddDirectJoinComponent;
  let fixture: ComponentFixture<AddDirectJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddDirectJoinComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [AddDirectJoinService, UserinfoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDirectJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
