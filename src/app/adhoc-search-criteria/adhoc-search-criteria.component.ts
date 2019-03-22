import { Component, OnInit } from '@angular/core';
import {
  TableColumnNode, SearchCriteria, ResultFields, SearchResult, Tab, NestedLinks, SelectedTables,
  AdhocHeaderInfo,
  Adhoc
} from '../adhoc-landing-page/adhoc';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AdhocScreenService } from './adhoc-screen.service';
import { AdhocSavedObjectService } from '../adhoc-header/adhoc-saved-object.service';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';
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
  openedPanelIndex = 0;
  inlinePanelTab = new Tab();
  sidePanelTab = new Tab();
  panelOpenState = false;
  searchCriteriaLength = 0;
  searchResultLength = 0;
  openSearch = true;
  TREE_DATA: TableColumnNode[] = [];
  isSearchScreen = false;
  isPanelColumnScreen = false;
  treeMap = new Map();
  tableColumnList: SelectedTables[] = [];
  screenInfoObject = new Adhoc();
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
  constructor(private router: Router, private adhocScreenService: AdhocScreenService, private adhocService: AdhocService,
    private adhocSavedObjectService: AdhocSavedObjectService, public activatedRoute: ActivatedRoute, ) {
  }
  ngOnInit() {
    this.screenInfoObject = this.adhocSavedObjectService.screenInfoObject;
    if (this.screenInfoObject.sessionAdhocModel.searchCriteria.length > 0) {
      this.adhocScreenService.updateSearchCriteria(this.screenInfoObject.sessionAdhocModel.searchCriteria);
    }
    if (this.screenInfoObject.sessionAdhocModel.searchResult.mainPanel.length > 0) {
      this.adhocScreenService.updateSearchResult(this.screenInfoObject.sessionAdhocModel.searchResult);
    }
    this.initTab();
    this.getTableColumnList();
  }

  filterOnlySelectedTable() {
    const selectedValues = JSON.parse(this.screenInfoObject.sessionAdhocModel.graphDetails.selectedValues.replace(/'/g, '"'));
    const joinListMap = new Map(JSON.parse(this.screenInfoObject.sessionAdhocModel.graphDetails.joinListMap.replace(/'/g, '"')));
    const tableNames = selectedValues;
    const selectedTables: SelectedTables[] = [];
    for (const table of tableNames) {
      const tableId = joinListMap.get(table)[0].primaryTableId;
      selectedTables.push(this.tableColumnList.filter(a => a.tableId === tableId)[0]);
    }
    this.tableColumnList = selectedTables;
    this.createTableColumnTree();
  }

  getTableColumnList() {
    let tempHeader = new AdhocHeaderInfo();
    this.adhocService.updatedAdhocHeaderInfo.subscribe(response => {
      tempHeader = response;
    });
    const param: any = {
      'mmrVersion': tempHeader.metadataVersion,
      'workspaceId': tempHeader.workspaceId
    };
    this.adhocService.getTableColumnList(param).subscribe(response => {
      this.tableColumnList = response;
      this.filterOnlySelectedTable();
    });
  }

  createTableColumnTree() {
    let tableColumnNode = new TableColumnNode();
    for (const table of this.tableColumnList) {
      tableColumnNode = new TableColumnNode();
      tableColumnNode.id = table.tableId;
      tableColumnNode.type = 'Table';
      tableColumnNode.name = table.schemaName + '/' + table.tableName;
      tableColumnNode.visible = true;
      for (const column of table.columnList) {
        tableColumnNode.columns.push({ 'id': column.columnId, 'name': column.name, 'type': 'column', 'visible': true });
      }
      this.TREE_DATA.push(tableColumnNode);
    }
    this.adhocScreenService.updateTreeData(this.TREE_DATA);
    this.dataSource.data = JSON.parse(JSON.stringify(this.TREE_DATA));
    this.createMapOfTree();
  }

  createMapOfTree() {
    for (const table of this.TREE_DATA) {
      if (table.columns.length > 0) {
        for (const col of table.columns) {
          this.treeMap.set(col.id, table.id);
        }
      }
    }
    this.adhocScreenService.setTreeMap(this.treeMap);
  }

  initTab() {
    this.inlinePanelTab.tabOrder = 0;
    this.inlinePanelTab.tabName = 'Tab 1';
    this.sidePanelTab.tabOrder = 0;
    this.sidePanelTab.tabName = 'Tab 1';
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  drop(event: CdkDragDrop<string[]>) {

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
  updateSearchCriteriaLength(length: number) {
    this.searchCriteriaLength = length;
  }

  gotoGraph() {
    this.router.navigate(['/workspace/adhoc/screen/table']);
  }

  searchResultLengthFn(length: number) {
    this.searchResultLength = length;
  }

  gotoNestedScreen() {
    let searchCriteria: SearchCriteria[] = [];
    let searchResult = new SearchResult();
    this.adhocScreenService.updatedSearchCriteria.subscribe(result => {
      searchCriteria = JSON.parse(JSON.stringify(result));
    });
    this.adhocScreenService.updatedSearchResult.subscribe(result => {
      searchResult = JSON.parse(JSON.stringify(result));
    });
    let tempHeader = new AdhocHeaderInfo();
    this.adhocService.updatedAdhocHeaderInfo.subscribe(response => {
      tempHeader = response;
    });
    this.screenInfoObject.screenId = this.screenInfoObject.id;
    this.screenInfoObject.sessionAdhocModel.applicationInfo = this.screenInfoObject.applicationInfo;
    delete this.screenInfoObject.sessionAdhocModel.applicationInfo['createdAt'];
    delete this.screenInfoObject.sessionAdhocModel.applicationInfo['updatedAt'];
    delete this.screenInfoObject['childScreenInfo'];
    delete this.screenInfoObject['id'];
    if (this.screenInfoObject.parentScreenInfo.screenId === '') {
      delete this.screenInfoObject['parentScreenInfo'];
    }
    delete this.screenInfoObject.sessionAdhocModel.applicationInfo['updatedAt'];
    delete this.screenInfoObject.sessionAdhocModel['outputLoc'];
    this.screenInfoObject.sessionAdhocModel.searchCriteria = searchCriteria;
    this.screenInfoObject.sessionAdhocModel.searchResult = searchResult;
    this.screenInfoObject.sessionAdhocModel.selectedTables = this.tableColumnList;
    this.screenInfoObject.mmrVersion = tempHeader.metadataVersion;
    this.addOrder();
    this.addSchemaName(this.tableColumnList[0].schemaName);
    this.screenInfoObject.schemaName = this.tableColumnList[0].schemaName;
    this.screenInfoObject.sessionAdhocModel.primaryTable = this.tableColumnList[0].schemaName + '/' + this.tableColumnList[0].tableName;
    this.screenInfoObject.sessionAdhoc = this.screenInfoObject.sessionAdhocModel;
    delete this.screenInfoObject['sessionAdhocModel'];
    delete this.screenInfoObject['position'];
    delete this.screenInfoObject['createdAt'];
    delete this.screenInfoObject['updatedAt'];
    this.adhocService.updateScreen(this.screenInfoObject, this.screenInfoObject.screenId).subscribe(result => {
      console.log(result);
    });

    this.adhocScreenService.updateSearchCriteria([]);
    this.adhocScreenService.updateSearchResult(new SearchResult());
    this.adhocScreenService.updateSearchCriterion(new SearchCriteria());
    this.adhocScreenService.updateInlinePanelTabChange(new Tab());
    this.adhocScreenService.updateSidePanelTabChange(new Tab());
    this.adhocScreenService.updateResultField(new ResultFields());
    this.adhocScreenService.updatePanelChanged(0);
    this.router.navigate(['workspace/adhoc/app-screen-list']);
  }

  addOrder() {
    this.screenInfoObject.sessionAdhocModel.searchCriteria.forEach((value, index) => {
      value.order = index + 1;
    });
    this.screenInfoObject.sessionAdhocModel.searchResult.mainPanel.forEach((value, index) => {
      value.order = index + 1;
    });
    const inlineTabs: Tab[] = this.screenInfoObject.sessionAdhocModel.searchResult.inLinePanel.tabs;
    const sideTabs: Tab[] = this.screenInfoObject.sessionAdhocModel.searchResult.sidePanel.tabs;
    for (let i = 0; i < inlineTabs.length; i++) {
      inlineTabs[i].tabOrder = i + 1;
      inlineTabs[i].resultFields.forEach((value, index) => {
        value.order = index + 1;
      });
    }
    for (let i = 0; i < sideTabs.length; i++) {
      sideTabs[i].tabOrder = i + 1;
      sideTabs[i].resultFields.forEach((value, index) => {
        value.order = index + 1;
      });
    }
  }

  addSchemaName(schemaName) {
    this.screenInfoObject.sessionAdhocModel.linearTableMapOrder.forEach((value, index) => {
      value.tableName = schemaName + '/' + value.tableName;
    });
  }

  clear() {
  }
}
