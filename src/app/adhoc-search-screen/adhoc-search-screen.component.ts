import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AdhocScreenService } from '../adhoc-search-criteria/adhoc-screen.service';
import { SearchColumn, TableColumnNode } from '../adhoc-landing-page/adhoc';
import { Router } from '@angular/router';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';

@Component({
  selector: 'app-adhoc-search-screen',
  templateUrl: './adhoc-search-screen.component.html',
  styleUrls: ['./adhoc-search-screen.component.css']
})
export class AdhocSearchScreenComponent implements OnInit {
  searchColumns: SearchColumn[];
  TREE_DATA: TableColumnNode[];
  @Output() showEditEvent = new EventEmitter<boolean>();
  constructor(private adhocScreenService: AdhocScreenService,
    private router: Router, private adhocService: AdhocService) { }

  ngOnInit() {
    this.adhocScreenService.updatedSearchColumns.subscribe(result => {
      this.searchColumns = JSON.parse(JSON.stringify(result));
    });
    this.adhocService.updatedAdhocHeaderInfo.subscribe(result => {
      if (result === null) {
        this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
      }
    });
  }

  gotoSearchColumnEdit(columnId) {
    const temp = this.searchColumns.find(a => a.columnId === columnId);
    this.adhocScreenService.updateSearchColumn(temp);
    this.showEditEvent.emit(true);
   // this.router.navigate(['/workspace/adhoc/screen/search-criteria/edit-search-screen']);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.searchColumns, event.previousIndex, event.currentIndex);
  }
  deleteSearchColumn(columnId, tableId) {
    const index = this.searchColumns.findIndex(a => a.columnId === columnId);
    this.adhocScreenService.updatedTreeData.subscribe(result => {
      this.TREE_DATA = JSON.parse(JSON.stringify(result));
    });
    this.TREE_DATA.find(a => a.id === tableId).columns.find(b => b.id === columnId).visible = true;
    if (index !== -1) {
      this.searchColumns.splice(index, 1);
    }
    this.adhocScreenService.updateTreeData(this.TREE_DATA);
    this.adhocScreenService.updateSearchColumns(this.searchColumns);
  }
}
