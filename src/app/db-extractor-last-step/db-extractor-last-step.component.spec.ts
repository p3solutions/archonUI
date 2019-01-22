import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Observable} from 'rxjs'
import { DbExtractorLastStepComponent } from './db-extractor-last-step.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ProcessDetailsObj } from '../db-extractor';

xdescribe('DbExtractorLastStepComponent', () => {
  let component: DbExtractorLastStepComponent;
  let fixture: ComponentFixture<DbExtractorLastStepComponent>;
  const data='';
  const getSimpleObservable = function(data) {
    return new Observable<any>((observer) => {
      observer.next(data); // observable execution
      observer.complete();
    });
  };
  const disposeMe = new Map();
  const getDBInfoByID = function (data): Observable<any> {
    const pvtObservable = getSimpleObservable(data);
    disposeMe.set('getDatabaseID', pvtObservable.subscribe());
    return pvtObservable;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbExtractorLastStepComponent ],
      imports: [ RouterTestingModule,HttpClientModule],
      providers:[UserinfoService,WorkspaceHeaderService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbExtractorLastStepComponent);
    component = fixture.componentInstance;
    const WHS = TestBed.get(WorkspaceHeaderService);
    spyOn(WHS, 'getDatabaseID').and.returnValue(WHS.getDatabaseID);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
