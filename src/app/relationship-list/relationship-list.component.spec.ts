import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipListComponent } from './relationship-list.component';
import { TableListService } from '../table-list/table-list.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';

describe('RelationshipListComponent', () => {
  let component: RelationshipListComponent;
  let fixture: ComponentFixture<RelationshipListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipListComponent ],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [TableListService, UserinfoService, WorkspaceHeaderService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
