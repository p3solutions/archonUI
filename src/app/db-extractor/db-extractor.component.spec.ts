import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DbExtractorComponent } from './db-extractor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DbExtractorService } from './db-extractor.service';
import { UserinfoService } from '../userinfo.service';
describe('DbExtractorComponent', () => {
  let component: DbExtractorComponent;
  let fixture: ComponentFixture<DbExtractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DbExtractorComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [DbExtractorService, UserinfoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbExtractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
