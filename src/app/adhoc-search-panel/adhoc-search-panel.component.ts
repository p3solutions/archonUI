import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Tab, SearchResult, ResultFields, TableColumnNode, InlinePanel, SidePanel } from '../adhoc-landing-page/adhoc';
import { AdhocScreenService } from '../adhoc-search-criteria/adhoc-screen.service';
import { Router } from '@angular/router';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-adhoc-search-panel',
  templateUrl: './adhoc-search-panel.component.html',
  styleUrls: ['./adhoc-search-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdhocSearchPanelComponent implements OnInit {
  openPanelIndex = 0;
  selectedInlineTab = 0;
  selectedSideTab = 0;
  inlineTabs = 1;
  sideTabs = 1;
  searchResult = new SearchResult();
  selectedInlineTabObject = new Tab();
  selectedSideTabObject = new Tab();
  @Output() showPanelEditEvent = new EventEmitter<boolean>();
  @Output() panelChanged = new EventEmitter<number>();
  @Output() inlinePanelTabChange = new EventEmitter<Tab>();
  @Output() sidePanelTabChange = new EventEmitter<Tab>();
  @Output() searchResultLength = new EventEmitter<number>();
  TREE_DATA: TableColumnNode[];
  inlineTabName = 'Tab 1';
  sideTabName = 'Tab 1';
  mainPanelId = 'main-panel-drop-id';
  renameTabName = '';
  constructor(private adhocScreenService: AdhocScreenService,
    public router: Router, private adhocService: AdhocService) { }

  ngOnInit() {
    this.adhocScreenService.searchResult.subscribe(result => {
      this.searchResult = JSON.parse(JSON.stringify(result));
      if (this.searchResult.inLinePanel === null) {
        this.searchResult.inLinePanel = new InlinePanel();
      }
      if (this.searchResult.sidePanel === null) {
        this.searchResult.sidePanel = new SidePanel();
      }
    });
    this.adhocScreenService.updatedPanelChanged.subscribe(result => {
      this.openPanelIndex = result;
    });
    this.adhocScreenService.updatedInlinePanelTabChange.subscribe(result => {
      this.selectedInlineTab = result.tabOrder;
    });
    this.adhocScreenService.updatedSidePanelTabChange.subscribe(result => {
      this.selectedSideTab = result.tabOrder;
    });
    this.checkSearchResultLength();
  }

  addTabInInlinePanel(event) {
    const tempTab = new Tab();
    tempTab.tabName = 'Tab ' + +(this.inlineTabs + 1);
    this.searchResult.inLinePanel.tabs.push(tempTab);
    this.adhocScreenService.updateSearchResult(this.searchResult);
    this.selectedInlineTab = this.searchResult.inLinePanel.tabs.length - 1;
    this.inlineTabs = this.inlineTabs + 1;
  }

  removeInlineTab(index) {
    this.searchResult.inLinePanel.tabs.splice(index, 1);
    this.adhocScreenService.updateSearchResult(this.searchResult);
    this.selectedInlineTab = this.searchResult.inLinePanel.tabs.length - 1;
  }

  addTabInSidePanel() {
    const tempTab = new Tab();
    tempTab.tabName = 'Tab ' + +(this.sideTabs + 1);
    this.searchResult.sidePanel.tabs.push(tempTab);
    this.adhocScreenService.updateSearchResult(this.searchResult);
    this.selectedSideTab = this.searchResult.sidePanel.tabs.length - 1;
    this.sideTabs = this.sideTabs + 1;
  }

  removeSideTab(index: number) {
    this.searchResult.sidePanel.tabs.splice(index, 1);
    this.adhocScreenService.updateSearchResult(this.searchResult);
    this.selectedSideTab = this.searchResult.sidePanel.tabs.length - 1;
  }

  panelChange(tabChangeEvent) {
    this.openPanelIndex = tabChangeEvent.index;
    this.panelChanged.emit(tabChangeEvent.index);
    this.adhocScreenService.updatePanelChanged(this.openPanelIndex);
  }

  inlinePanelTabChanged(tabChangeEvent) {
    this.selectedInlineTab = tabChangeEvent.index;
    let tempInlineTab = new Tab();
    tempInlineTab = this.searchResult.inLinePanel.tabs[tabChangeEvent.index];
    tempInlineTab.tabOrder = tabChangeEvent.index;
    this.selectedInlineTabObject = tempInlineTab;
    this.inlinePanelTabChange.emit(tempInlineTab);
    this.inlineTabName = tempInlineTab.tabName;
    this.adhocScreenService.updateInlinePanelTabChange(this.selectedInlineTabObject);
  }

  sidePanelTabChanged(tabChangeEvent) {
    this.selectedSideTab = tabChangeEvent.index;
    let tempSideTab = new Tab();
    tempSideTab = this.searchResult.sidePanel.tabs[tabChangeEvent.index];
    tempSideTab.tabOrder = tabChangeEvent.index;
    this.sideTabName = tempSideTab.tabName;
    this.selectedSideTabObject = tempSideTab;
    this.sidePanelTabChange.emit(tempSideTab);
    this.adhocScreenService.updateSidePanelTabChange(this.selectedSideTabObject);
  }

  gotoMainPanelColumnEdit(columnId: string, tableId: string, label: string) {
    const temp = this.searchResult.mainPanel.find(a => a.columnId === columnId &&
      a.tableId === tableId && a.label === label);
    this.adhocScreenService.updateResultField(temp);
    this.showPanelEditEvent.emit(true);
  }
  gotoInlinePanelColumnEdit(columnId: string, tableId: string, label: string) {
    const temp = this.searchResult.inLinePanel.tabs[this.selectedInlineTab].resultFields.find(a => a.columnId ===
      columnId && a.tableId === tableId && a.label === label);
    this.adhocScreenService.updateResultField(temp);
    this.showPanelEditEvent.emit(true);
  }
  gotoSidePanelColumnEdit(columnId: string, tableId: string, label: string) {
    const temp = this.searchResult.sidePanel.tabs[this.selectedSideTab].resultFields.find(a => a.columnId ===
      columnId && a.tableId === tableId && a.label === label);
    this.adhocScreenService.updateResultField(temp);
    this.showPanelEditEvent.emit(true);
  }

  deleteMainPanelColumn(columnId: string, tableId: string, label: string) {
    const index = this.searchResult.mainPanel.findIndex(a => a.columnId === columnId &&
      a.tableId === tableId && a.label === label);
    if (index !== -1) {
      this.searchResult.mainPanel.splice(index, 1);
    }
    this.checkSearchResultLength();
    this.adhocScreenService.updateSearchResult(this.searchResult);
  }
  deleteInlinePanelColumn(columnId: string, tableId: string, label: string) {
    const index = this.searchResult.inLinePanel.tabs[this.selectedInlineTab].resultFields.findIndex(a => a.columnId ===
      columnId && a.tableId === tableId && a.label === label);
    if (index !== -1) {
      this.searchResult.inLinePanel.tabs[this.selectedInlineTab].resultFields.splice(index, 1);
    }
    this.checkSearchResultLength();
    this.adhocScreenService.updateSearchResult(this.searchResult);

  }
  deleteSidePanelColumn(columnId: string, tableId: string, label: string) {
    const index = this.searchResult.sidePanel.tabs[this.selectedSideTab].resultFields.findIndex(a => a.columnId ===
      columnId && a.tableId === tableId && a.label === label);
    if (index !== -1) {
      this.searchResult.sidePanel.tabs[this.selectedSideTab].resultFields.splice(index, 1);
    }
    this.checkSearchResultLength();
    this.adhocScreenService.updateSearchResult(this.searchResult);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.container !== event.previousContainer) {
      const tableId = this.adhocScreenService.treeMap.get(event.item.data.node.id);
      this.adhocScreenService.updatedTreeData.subscribe(result => {
        this.TREE_DATA = JSON.parse(JSON.stringify(result));
      });
      const tableName = this.TREE_DATA.find(a => a.id === tableId).name;
      const tempResultFields = new ResultFields();
      tempResultFields.tableId = tableId;
      tempResultFields.columnId = event.item.data.node.id;
      tempResultFields.name = event.item.data.node.name;
      tempResultFields.tableName = tableName;
      tempResultFields.label = event.item.data.node.name;
      this.adhocScreenService.updatedSearchResult.subscribe(result => {
        this.searchResult = result;
      });

      if (this.checkDuplicateResultFields(tempResultFields.label, tableId)) {
        if (this.openPanelIndex === 0) {
          this.searchResult.mainPanel.push(tempResultFields);
        }
        if (this.openPanelIndex === 1) {
          const temp = this.searchResult.inLinePanel.tabs[this.selectedInlineTab];
          temp.resultFields.push(tempResultFields);
        }
        if (this.openPanelIndex === 2) {
          const temp = this.searchResult.sidePanel.tabs[this.selectedSideTab];
          temp.resultFields.push(tempResultFields);
        }
      } else {
        document.getElementById('label-popup-btn').click();
      }
      this.checkSearchResultLength();
    } else {
      if (this.openPanelIndex === 0) {
        moveItemInArray(this.searchResult.mainPanel, event.previousIndex, event.currentIndex);
      }
      if (this.openPanelIndex === 1) {
        moveItemInArray(this.searchResult.inLinePanel.tabs[this.selectedInlineTab].resultFields, event.previousIndex, event.currentIndex);
      }
      if (this.openPanelIndex === 2) {
        moveItemInArray(this.searchResult.sidePanel.tabs[this.selectedSideTab].resultFields, event.previousIndex, event.currentIndex);
      }
    }
    this.adhocScreenService.updateSearchResult(this.searchResult);
  }
  checkDuplicateResultFields(label, tableId) {
    let temp = true;
    for (const item of this.searchResult.mainPanel) {
      if ((item.label.replace(/ /g, '').toLocaleLowerCase() === label.replace(/ /g, '').toLocaleLowerCase()) &&
        (tableId === item.tableId)) {
        temp = false;
        break;
      }
    }
    for (const inlineTab of this.searchResult.inLinePanel.tabs) {
      for (const item of inlineTab.resultFields) {
        if ((item.label.replace(/ /g, '').toLocaleLowerCase() === label.replace(/ /g, '').toLocaleLowerCase()) &&
          (tableId === item.tableId)) {
          temp = false;
          break;
        }
      }
    }
    for (const sideTab of this.searchResult.sidePanel.tabs) {
      for (const item of sideTab.resultFields) {
        if ((item.label.replace(/ /g, '').toLocaleLowerCase() === label.replace(/ /g, '').toLocaleLowerCase()) &&
          (tableId === item.tableId)) {
          temp = false;
          break;
        }
      }
    }
    return temp;
  }
  checkSearchResultLength() {
    let searchResultLength = 0;
    for (const item of this.searchResult.mainPanel) {
      searchResultLength = searchResultLength + 1;
    }
    for (const inlineTab of this.searchResult.inLinePanel.tabs) {
      for (const item of inlineTab.resultFields) {
        searchResultLength = searchResultLength + 1;
      }
    }
    for (const sideTab of this.searchResult.sidePanel.tabs) {
      for (const item of sideTab.resultFields) {
        searchResultLength = searchResultLength + 1;
      }
    }
    this.searchResultLength.emit(searchResultLength);
  }

  renameSideTabName() {
    console.log(this.sideTabName, this.selectedSideTab);
    this.searchResult.sidePanel.tabs[this.selectedSideTab].tabName = this.sideTabName;
    console.log(this.searchResult.sidePanel.tabs[this.selectedSideTab].tabName);
    this.adhocScreenService.updateSearchResult(this.searchResult);
  }
  renameInlineTabName() {
    this.searchResult.inLinePanel.tabs[this.selectedInlineTab].tabName = this.inlineTabName;
    this.adhocScreenService.updateSearchResult(this.searchResult);
  }

  openInlineRenamePopup() {
    document.getElementById('inline-tab-rename-popup-btn').click();
    this.inlineTabName = this.searchResult.inLinePanel.tabs[this.selectedInlineTab].tabName;
  }

  openSideRenamePopup() {
    document.getElementById('side-tab-rename-popup-btn').click();
    this.sideTabName = this.searchResult.sidePanel.tabs[this.selectedSideTab].tabName;
  }
}
