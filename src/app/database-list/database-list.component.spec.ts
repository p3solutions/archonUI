import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseListComponent } from './database-list.component';
import { DatabaseListService } from './database-list.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { CommonUtilityService } from '../common-utility.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatCardModule, MatInputModule, MatTableModule, MatPaginator, MatPaginatorModule } from '@angular/material';
import { SearchPipe } from '../search.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DatabaseListComponent', () => {
  let component: DatabaseListComponent;
  let fixture: ComponentFixture<DatabaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatabaseListComponent, SearchPipe],
      imports: [HttpClientModule, RouterTestingModule,
        FormsModule, MatFormFieldModule, MatCardModule, MatInputModule, BrowserAnimationsModule],
      providers: [DatabaseListService, UserinfoService, DynamicLoaderService, CommonUtilityService, WorkspaceHeaderService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseListComponent);
    component = fixture.componentInstance;
    const WHS = TestBed.get(WorkspaceHeaderService);
    spyOn(WHS, 'getDatabaseID').and.returnValue(WHS.getDatabaseID);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
