import { Component, OnInit } from '@angular/core';
import { TableColumnNode, SearchCriteria, ResultFields, SearchResult, Tab, NestedLinks, SelectedTables,
   AdhocHeaderInfo } from '../adhoc-landing-page/adhoc';
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
  redirect = '';
  tableColumnList: SelectedTables[] = [];
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
    let selectedValues: string[] = [];
    let joinListMap = new Map();
    this.redirect = this.activatedRoute.snapshot.paramMap.get('redirect');
    this.initTab();
    if (this.redirect === null) {
      this.adhocScreenService.updateTreeData(this.TREE_DATA);
      this.dataSource.data = JSON.parse(JSON.stringify(this.TREE_DATA));
      this.createMapOfTree();
    } else {
      selectedValues = JSON.parse(this.adhocSavedObjectService.graphDetails.selectedValues);
      joinListMap = new Map(JSON.parse(this.adhocSavedObjectService.graphDetails.joinListMap));
    }
    // const tabelIds = this.getTableIdFromTableName(selectedValues, joinListMap);
    // this.getTableColumnList(tabelIds);
  }

  getTableIdFromTableName(selectedValues: string[] = [], joinListMap = new Map): string[] {
    const tableNames = selectedValues;
    const tableIds: string[] = [];
    for (const table of tableNames) {
      const tableId = joinListMap.get(table)[0].primaryTableId;
      tableIds.push(tableId);
    }
    return tableIds;
  }

  getTableColumnList(tableIds: string[] = []) {
    let tempHeader = new AdhocHeaderInfo();
    this.adhocService.updatedAdhocHeaderInfo.subscribe(response => {
      tempHeader = response;
    });
    const param: any = {
      'tableIdList': tableIds,
      'mmrVersion': tempHeader.metadataVersion,
      'workspaceId': tempHeader.workspaceId
    };
    console.log(JSON.stringify(param));
    this.adhocService.getTableColumnList(param).subscribe(response => {

    });
  }

  createTableColumnTree() {
    let tableColumnNode = new TableColumnNode();
    for (const table of this.tableColumnList) {
      tableColumnNode = new TableColumnNode();
      tableColumnNode.id = table.tableId;
      tableColumnNode.type = 'Table';
      tableColumnNode.name = table.tableName;
      tableColumnNode.visible = false;
      for (const column of table.columnList) {
        tableColumnNode.columns.push({ 'id': column.columnId, 'name': column.name, 'type': 'column', 'visible': false });
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
    if (this.redirect !== null) {
      this.router.navigate(['workspace/adhoc/screen/table/'], { queryParams: { redirect: 'N' } });
    } else {
      this.router.navigate(['/workspace/adhoc/screen/table']);
    }
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
    this.adhocScreenService.updateSearchCriteria([]);
    this.adhocScreenService.updateSearchResult(new SearchResult());
    this.adhocScreenService.updateSearchCriterion(new SearchCriteria());
    this.adhocScreenService.updateInlinePanelTabChange(new Tab());
    this.adhocScreenService.updateSidePanelTabChange(new Tab());
    this.adhocScreenService.updateResultField(new ResultFields());
    this.adhocScreenService.updatePanelChanged(0);
    const tempNestedLink = new NestedLinks();
    tempNestedLink.searchName = 'NestedLink1';
    const tempNestedLinks = this.adhocSavedObjectService.nestedLinks;
    tempNestedLinks.push(tempNestedLink);
    this.adhocSavedObjectService.setNestedLinks(tempNestedLinks);
    this.adhocScreenService.updatedSearchResult.subscribe(result => {
      searchResult = JSON.parse(JSON.stringify(result));
    });
    this.adhocSavedObjectService.setSearchCriteria(searchCriteria);
    this.adhocSavedObjectService.setSearchResult(searchResult);
    this.router.navigate(['workspace/adhoc/screen/table/'], { queryParams: { redirect: 'N' } });
  }

  clear() {
    let searchResult = new SearchResult();
    this.adhocScreenService.updatedSearchResult.subscribe(result => {
      searchResult = JSON.parse(JSON.stringify(result));
    });
    let tempNestedLink = new NestedLinks();
    const tempNestedLinks = this.adhocSavedObjectService.nestedLinks;
    tempNestedLink = tempNestedLinks.find(a => a.searchName === 'NestedLink1');
    const index = tempNestedLinks.findIndex(a => a.searchName === 'NestedLink1');
    tempNestedLink.searchResult = searchResult;
    if (index !== -1) {
      tempNestedLinks.splice(index, 1, tempNestedLink);
    }
    this.adhocSavedObjectService.setNestedLinks(tempNestedLinks);
    this.router.navigate(['workspace/adhoc/screen/table/'], { queryParams: { redirect: 'N' } });
  }
}
