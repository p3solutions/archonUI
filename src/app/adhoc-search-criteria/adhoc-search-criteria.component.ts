import { Component, OnInit, ViewChild } from '@angular/core';
import { TableColumnNode, SearchColumn } from '../adhoc-landing-page/adhoc';
import { NestedTreeControl, FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';
import { AdhocScreenService } from './adhoc-screen.service';
import { map } from 'rxjs/operators';
interface ExampleFlatNode {
  expandable: boolean;
  node: { name: string, type: string, id: string, 'visible': boolean };
  level: number;
}

@Component({
  selector: 'app-adhoc-search-criteria',
  templateUrl: './adhoc-search-criteria.component.html',
  styleUrls: ['./adhoc-search-criteria.component.css']
})
export class AdhocSearchCriteriaComponent implements OnInit {
  searchColumn: SearchColumn[] = [];
  panelColumns: SearchColumn[] = [];

  panelOpenState = false;
  TREE_DATA: TableColumnNode[] = [
    {
      id: '1',
      type: 'Table',
      name: 'Address',
      visible: true,
      columns: [
        {
          id: '11',
          type: 'Column', name: 'Address 1', visible: true
        },
        {
          id: '21',
          type: 'Column', name: 'Address 2', visible: true
        },
        {
          id: '31',
          type: 'Column', name: 'Address 3', visible: true
        },
      ]
    },
    {
      id: '2',
      type: 'Table',
      name: 'Claim',
      visible: true,
      columns: [
        {
          id: '12',
          type: 'Column', name: 'Claim 1', visible: true
        },
        {
          id: '22',
          type: 'Column', name: 'Claim 2', visible: true
        },
        {
          id: '32',
          type: 'Column', name: 'Claim 3', visible: true
        },
      ]
    },
    {
      id: '3',
      type: 'Table',
      name: 'Member',
      visible: true,
      columns: [
        {
          id: '13',
          type: 'Column', name: 'Member', visible: true
        },
        {
          id: '23',
          type: 'Column', name: 'Member', visible: true
        },
        {
          id: '33',
          type: 'Column', name: 'Member', visible: true
        },
      ]
    }
  ];
  isSearchScreen = false;
  treeMap = new Map();
  treeControl = new FlatTreeControl<ExampleFlatNode>(node => node.level, node => node.expandable);
  transformer = (node: TableColumnNode, level: number) => {
    return {
      expandable: !!node.columns && node.columns.length > 0,
      node: { 'id': node.id, 'name': node.name, 'type': node.type, 'visible': node.visible },
      level: level,
    };
  }

  // tslint:disable-next-line:member-ordering
  treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.columns);

  // tslint:disable-next-line:member-ordering
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private router: Router, private adhocScreenService: AdhocScreenService) {
  }
  ngOnInit() {
    this.router.navigate(['/workspace/adhoc/screen/search-criteria/search-screen']);
    this.adhocScreenService.updateTreeData(this.TREE_DATA);
    this.adhocScreenService.updatedTreeData.subscribe(result => {
      this.TREE_DATA = result;
      this.dataSource.data = JSON.parse(JSON.stringify(this.TREE_DATA));
      this.createMapOfTree();
    });
  }
  createMapOfTree() {
    for (const table of this.TREE_DATA) {
      if (table.columns.length > 0) {
        for (const col of table.columns) {
          this.treeMap.set(col.id, table.id);
        }
      }
    }
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer);
    console.log(event.container);
    if (event.container.id === 'drag-search-column') {
      const tableId = this.treeMap.get(event.item.data.node.id);
      const tableName = this.TREE_DATA.find(a => a.id === tableId).name;
      this.adhocScreenService.updatedPanelColumns.subscribe(result => {
        this.searchColumn = result;
      });
      const tempSearchColumn = new SearchColumn();
      tempSearchColumn.tableId = tableId;
      tempSearchColumn.columnId = event.item.data.node.id;
      tempSearchColumn.columnName = event.item.data.node.name;
      tempSearchColumn.tableName = tableName;
      tempSearchColumn.label = event.item.data.node.name;
      this.searchColumn.push(tempSearchColumn);
      this.adhocScreenService.updateSearchColumns(this.searchColumn);
      this.treeControl.expand(this.treeControl.dataNodes.find(a => a.node.id === tableId));
    }
    if (event.container.id === 'drag-panel-column') {
      const tableId = this.treeMap.get(event.item.data.node.id);
      const tableName = this.TREE_DATA.find(a => a.id === tableId).name;
      this.adhocScreenService.updatedPanelColumns.subscribe(result => {
        this.panelColumns = result;
      });
      const tempSearchColumn = new SearchColumn();
      tempSearchColumn.tableId = tableId;
      tempSearchColumn.columnId = event.item.data.node.id;
      tempSearchColumn.columnName = event.item.data.node.name;
      tempSearchColumn.tableName = tableName;
      tempSearchColumn.label = event.item.data.node.name;
      this.panelColumns.push(tempSearchColumn);
      this.adhocScreenService.updatePanelColumns(this.panelColumns);
      this.treeControl.expand(this.treeControl.dataNodes.find(a => a.node.id === tableId));
    }
    if (event.previousContainer === event.container) {
      console.log(1);
    } else {
      console.log(2);
    }
  }

  filterTableAndColumn(str: string) {
    if (str !== '') {
      this.dataSource.data = JSON.parse(JSON.stringify(this.TREE_DATA.filter(a => a.name.toLocaleLowerCase()
        .includes(str.toLocaleLowerCase()))));
    } else {
      this.dataSource.data = JSON.parse(JSON.stringify(this.TREE_DATA));
    }
  }
  onVoted(str: string) {
    console.log(str);
  }

  showEdit(_isSearchScreen: boolean) {
    this.isSearchScreen = _isSearchScreen;
  }
  showSearch(_isSearchScreen: boolean) {
    this.isSearchScreen = _isSearchScreen;
  }
}
