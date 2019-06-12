import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AdhocScreenService } from '../adhoc-search-criteria/adhoc-screen.service';
import { SearchCriteria, TableColumnNode } from '../adhoc-landing-page/adhoc';
import { Router } from '@angular/router';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';

@Component({
  selector: 'app-adhoc-search-screen',
  templateUrl: './adhoc-search-screen.component.html',
  styleUrls: ['./adhoc-search-screen.component.css']
})
export class AdhocSearchScreenComponent implements OnInit {
  searchCriteria: SearchCriteria[] = [];
  TREE_DATA: TableColumnNode[];
  @Output() showEditEvent = new EventEmitter<boolean>();
  @Output() updateSearchCriteriaLength = new EventEmitter<number>();

  constructor(private adhocScreenService: AdhocScreenService,
    public router: Router, private adhocService: AdhocService) { }

  ngOnInit() {
    this.adhocScreenService.updatedSearchCriteria.subscribe(result => {
      this.searchCriteria = JSON.parse(JSON.stringify(result));
      this.updateSearchCriteriaLength.emit(this.searchCriteria.length);
    });
  }

  gotoSearchCriteriaEdit(columnId) {
    const temp = this.searchCriteria.find(a => a.columnId === columnId);
    this.adhocScreenService.updateSearchCriterion(temp);
    this.showEditEvent.emit(true);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.container !== event.previousContainer) {
      this.adhocScreenService.updatedTreeData.subscribe(result => {
        this.TREE_DATA = JSON.parse(JSON.stringify(result));
      });
      const tableId = this.adhocScreenService.treeMap.get(event.item.data.node.id);
      const tableName = this.TREE_DATA.find(a => a.id === tableId).name;
      this.adhocScreenService.updatedSearchCriteria.subscribe(result => {
        this.searchCriteria = result;
      });
      if (this.searchCriteria.filter(a => a.columnId === event.item.data.node.id).length === 0) {
        const tempSearchCriteria = new SearchCriteria();
        tempSearchCriteria.tableId = tableId;
        tempSearchCriteria.columnId = event.item.data.node.id;
        tempSearchCriteria.name = event.item.data.node.name;
        tempSearchCriteria.tableName = tableName;
        tempSearchCriteria.label = event.item.data.node.name;
        tempSearchCriteria.dataType = event.item.data.node.dataType;
        if (tempSearchCriteria.dataType === 'date') {
          tempSearchCriteria.fieldType = 'DATE';
        }
        this.searchCriteria.push(tempSearchCriteria);
      } else {
        document.getElementById('label-popup-btn').click();
      }
    } else if (event.container === event.previousContainer) {
      moveItemInArray(this.searchCriteria, event.previousIndex, event.currentIndex);
    }
    this.adhocScreenService.updateSearchCriteria(this.searchCriteria);
    this.updateSearchCriteriaLength.emit(this.searchCriteria.length);
  }

  deleteSearchCriteria(columnId, tableId) {
    const index = this.searchCriteria.findIndex(a => a.columnId === columnId);
    this.adhocScreenService.updatedTreeData.subscribe(result => {
      this.TREE_DATA = JSON.parse(JSON.stringify(result));
    });
    if (index !== -1) {
      this.searchCriteria.splice(index, 1);
    }
    this.adhocScreenService.updateSearchCriteria(this.searchCriteria);
    this.updateSearchCriteriaLength.emit(this.searchCriteria.length);
  }
}
