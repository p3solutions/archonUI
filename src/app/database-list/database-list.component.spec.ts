import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseListComponent } from './database-list.component';
import { DatabaseListService } from './database-list.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { CommonUtilityService } from '../common-utility.service';

describe('DatabaseListComponent', () => {
  let component: DatabaseListComponent;
  let fixture: ComponentFixture<DatabaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseListComponent ],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [DatabaseListService, UserinfoService, DynamicLoaderService, CommonUtilityService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
