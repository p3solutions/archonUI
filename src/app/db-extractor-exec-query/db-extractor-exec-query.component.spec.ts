import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DbExtractorExecQueryComponent } from './db-extractor-exec-query.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';


describe('DbExtractorExecQueryComponent', () => {
  let component: DbExtractorExecQueryComponent;
  let fixture: ComponentFixture<DbExtractorExecQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DbExtractorExecQueryComponent],
      imports: [RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      providers: [UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbExtractorExecQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
