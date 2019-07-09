import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtCloneViewComponent } from './ert-clone-view.component';
import { SearchPipe } from '../search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ErtService } from '../ert-landing-page/ert.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('ErtCloneViewComponent', () => {
  let component: ErtCloneViewComponent;
  let fixture: ComponentFixture<ErtCloneViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErtCloneViewComponent, SearchPipe],
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [UserinfoService, WorkspaceHeaderService, ErtService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtCloneViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
