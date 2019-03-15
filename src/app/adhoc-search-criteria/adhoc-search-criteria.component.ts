import { Component, OnInit } from '@angular/core';
import { TableColumnNode, SearchColumn, PanelColumns, PanelDetails, Tab } from '../adhoc-landing-page/adhoc';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AdhocScreenService } from './adhoc-screen.service';
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
  panelColumns: PanelColumns[] = [];
  openedPanelIndex = 0;
  inlinePanelTab = new Tab();
  sidePanelTab = new Tab();
  panelOpenState = false;
  panelDetails = new PanelDetails();
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
  isPanelColumnScreen = false;
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
    this.inlinePanelTab.tabIndex = 0;
    this.inlinePanelTab.tabName = 'Tab 1';
    this.sidePanelTab.tabIndex = 0;
    this.sidePanelTab.tabName = 'Tab 1';
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
    if (event.container.id === 'drag-search-column') {
      this.insertSearchColumn(event);
    } else if (event.container.id === 'drag-panel-column') {
      this.insertPanelColumn(event);
    }
  }

  insertSearchColumn(event: CdkDragDrop<string[]>) {
    const tableId = this.treeMap.get(event.item.data.node.id);
    const tableName = this.TREE_DATA.find(a => a.id === tableId).name;
    this.adhocScreenService.updatedSearchColumns.subscribe(result => {
      this.searchColumn = result;
    });
    if (this.searchColumn.filter(a => a.columnId === event.item.data.node.id).length === 0) {
      const tempSearchColumn = new SearchColumn();
      tempSearchColumn.tableId = tableId;
      tempSearchColumn.columnId = event.item.data.node.id;
      tempSearchColumn.columnName = event.item.data.node.name;
      tempSearchColumn.tableName = tableName;
      tempSearchColumn.label = event.item.data.node.name;
      this.searchColumn.push(tempSearchColumn);
    } else {
      alert('Not allowed');
    }
    this.adhocScreenService.updateSearchColumns(this.searchColumn);
    this.treeControl.expand(this.treeControl.dataNodes.find(a => a.node.id === tableId));
  }

  insertPanelColumn(event: CdkDragDrop<string[]>) {
    const tableId = this.treeMap.get(event.item.data.node.id);
    const tableName = this.TREE_DATA.find(a => a.id === tableId).name;
    const tempPanelColumn = new PanelColumns();
    tempPanelColumn.tableId = tableId;
    tempPanelColumn.columnId = event.item.data.node.id;
    tempPanelColumn.columnName = event.item.data.node.name;
    tempPanelColumn.tableName = tableName;
    tempPanelColumn.label = event.item.data.node.name;
    this.adhocScreenService.updatedPanelDetails.subscribe(result => {
      this.panelDetails = result;
    });

    if (this.checkDuplicatePanelColumn(tempPanelColumn.label)) {
      if (this.openedPanelIndex === 0) {
        this.panelDetails.mainPanelDetails.panelColumn.push(tempPanelColumn);
      }
      if (this.openedPanelIndex === 1) {
        this.inlinePanelTab.panelColumn.push(tempPanelColumn);
        const temp = this.panelDetails.inlinePanelDetails.tabs[this.inlinePanelTab.tabIndex];
        temp.panelColumn = this.inlinePanelTab.panelColumn;
      }
      if (this.openedPanelIndex === 2) {
        this.sidePanelTab.panelColumn.push(tempPanelColumn);
        const temp = this.panelDetails.sidePanelDetails.tabs[this.sidePanelTab.tabIndex];
        temp.panelColumn = this.sidePanelTab.panelColumn;
      }
    }
    this.adhocScreenService.updatePanelDetails(this.panelDetails);
    this.treeControl.expand(this.treeControl.dataNodes.find(a => a.node.id === tableId));
  }

  checkDuplicatePanelColumn(label) {
    if (this.panelDetails.mainPanelDetails.panelColumn.filter(a => a.label === label).length > 0) {
      return false;
    }

    for (const inlineTab of this.panelDetails.inlinePanelDetails.tabs) {
      if (inlineTab.panelColumn.filter(a => a.label === label).length > 0) {
        return false;
      }
    }

    for (const sideTab of this.panelDetails.sidePanelDetails.tabs) {
      if (sideTab.panelColumn.filter(a => a.label === label).length > 0) {
        return false;
      }
    }
    return true;
  }

  filterTableAndColumn(str: string) {
    if (str !== '') {
      this.dataSource.data = JSON.parse(JSON.stringify(this.TREE_DATA.filter(a => a.name.toLocaleLowerCase()
        .includes(str.toLocaleLowerCase()))));
    } else {
      this.dataSource.data = JSON.parse(JSON.stringify(this.TREE_DATA));
    }
  }


  onPanelChanged(panelIndex: number) {
    this.openedPanelIndex = panelIndex;
  }

  showEdit(_isSearchScreen: boolean) {
    this.isSearchScreen = _isSearchScreen;
  }
  showSearch(_isSearchScreen: boolean) {
    this.isSearchScreen = _isSearchScreen;
  }

  showPanelEdit(_isPanelColumnScreen: boolean) {
    this.isPanelColumnScreen = _isPanelColumnScreen;
  }
  showPanelSearchColumn(_isPanelColumnScreen: boolean) {
    this.isPanelColumnScreen = _isPanelColumnScreen;
  }

  inlinePanelTabChange(tab: Tab) {
    this.inlinePanelTab = tab;
  }
  sidePanelTabChange(tab: Tab) {
    this.sidePanelTab = tab;
  }
}
