import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DbExtractorComponent } from './db-extractor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DbExtractorService } from './db-extractor.service';
import { UserinfoService } from '../userinfo.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
describe('DbExtractorComponent', () => {
  let component: DbExtractorComponent;
  let fixture: ComponentFixture<DbExtractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DbExtractorComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [DbExtractorService, UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbExtractorComponent);
    component = fixture.componentInstance;
    spyOn(component.router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
