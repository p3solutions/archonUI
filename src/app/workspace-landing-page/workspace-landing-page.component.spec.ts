import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkspaceLandingPageComponent } from './workspace-landing-page.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { InfoService } from '../info.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { Info } from '../info';

xdescribe('WorkspaceLandingPageComponent', () => {
  let component: WorkspaceLandingPageComponent;
  let fixture: ComponentFixture<WorkspaceLandingPageComponent>;
  let infoService: any;

  // mock data
  const info: any = { id: 11, username: 'deepak', role: 'Member' };
  const simpleObservable = new Observable<Info>((observer) => {
    observer.next(info);
    observer.complete();
  });
  let disposeMe;
  const getInfo = function (): Observable<Info> {
    disposeMe = simpleObservable.subscribe();
    return simpleObservable;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      providers: [RouterTestingModule, InfoService, HttpClientTestingModule ],
      declarations: [WorkspaceLandingPageComponent, NavbarComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceLandingPageComponent);
    component = fixture.componentInstance;
    infoService = TestBed.get(InfoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get data from InfoService', () => {
    spyOn(infoService, 'getinfo').and.returnValue(getInfo());
    component.getInfo();
    fixture.detectChanges();
    expect(info.username).toBe(component.info.username);
    disposeMe.unsubscribe();
  });

  it('Should have show == undefined for Member', () => {
    spyOn(infoService, 'getinfo').and.returnValue(getInfo());
    component.getInfo();
    fixture.detectChanges();
    expect(component.info.show).toBeUndefined(); // or may be toBeFalsy
    disposeMe.unsubscribe();
  });

  it('Should have show == true for Admin', () => {
    info.role = 'Admin';
    spyOn(infoService, 'getinfo').and.returnValue(getInfo());
    component.getInfo();
    fixture.detectChanges();
    expect(component.info.show).toBeTruthy();
    disposeMe.unsubscribe();
  });
});
