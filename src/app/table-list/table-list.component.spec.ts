import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListComponent } from './table-list.component';
import { EditRelationshipInfoComponent } from '../edit-relationship-info/edit-relationship-info.component';
import { AddDirectJoinComponent } from '../add-direct-join/add-direct-join.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../search.pipe';
import { SecondaryColumnPipe } from '../secondary-column.pipe';
import { TableListService } from './table-list.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { EditRelationshipInfoService } from '../edit-relationship-info/edit-relationship-info.service';
import { AddDirectJoinService } from '../add-direct-join/add-direct-join.service';

// Reason: Undefined Property
xdescribe('TableListComponent', () => {
  let component: TableListComponent;
  let fixture: ComponentFixture<TableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableListComponent, EditRelationshipInfoComponent, AddDirectJoinComponent, SearchPipe,
      SecondaryColumnPipe],
      imports: [RouterTestingModule, FormsModule, HttpClientModule],
      providers: [TableListService, UserinfoService, WorkspaceHeaderService, EditRelationshipInfoService, AddDirectJoinService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
