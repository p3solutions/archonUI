import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Tab, PanelDetails } from '../adhoc-landing-page/adhoc';
import { AdhocScreenService } from '../adhoc-search-criteria/adhoc-screen.service';
import { Router } from '@angular/router';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
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
  panelDetails = new PanelDetails();
  selectedInlineTabObject = new Tab();
  selectedSideTabObject = new Tab();
  @Output() showPanelEditEvent = new EventEmitter<boolean>();
  @Output() panelChanged = new EventEmitter<number>();
  @Output() inlinePanelTabChange = new EventEmitter<Tab>();
  @Output() sidePanelTabChange = new EventEmitter<Tab>();
  constructor(private adhocScreenService: AdhocScreenService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.adhocScreenService.updatedPanelDetails.subscribe(result => {
      this.panelDetails = JSON.parse(JSON.stringify(result));
    });
    this.adhocScreenService.updatedPanelChanged.subscribe(result => {
      this.openPanelIndex = result;
    });
    this.adhocScreenService.updatedInlinePanelTabChange.subscribe(result => {
      this.selectedInlineTab = result.tabIndex;
    });
    this.adhocScreenService.updatedSidePanelTabChange.subscribe(result => {
      this.selectedSideTab = result.tabIndex;
    });
  }

  addTabInInlinePanel(event) {
    const tempTab = new Tab();
    tempTab.tabName = 'Tab ' + +(this.inlineTabs + 1);
    this.panelDetails.inlinePanelDetails.tabs.push(tempTab);
    this.adhocScreenService.updatePanelDetails(this.panelDetails);
    this.selectedInlineTab = this.panelDetails.inlinePanelDetails.tabs.length - 1;
    this.inlineTabs = this.inlineTabs + 1;
  }

  removeInlineTab(index) {
    this.panelDetails.inlinePanelDetails.tabs.splice(index, 1);
    this.adhocScreenService.updatePanelDetails(this.panelDetails);
    this.selectedInlineTab = this.panelDetails.inlinePanelDetails.tabs.length - 1;
  }

  addTabInSidePanel() {
    const tempTab = new Tab();
    tempTab.tabName = 'Tab ' + +(this.sideTabs + 1);
    this.panelDetails.sidePanelDetails.tabs.push(tempTab);
    this.adhocScreenService.updatePanelDetails(this.panelDetails);
    this.selectedSideTab = this.panelDetails.sidePanelDetails.tabs.length - 1;
    this.sideTabs = this.sideTabs + 1;
  }

  removeSideTab(index: number) {
    this.panelDetails.sidePanelDetails.tabs.splice(index, 1);
    this.adhocScreenService.updatePanelDetails(this.panelDetails);
    this.selectedSideTab = this.panelDetails.sidePanelDetails.tabs.length - 1;
  }

  panelChange(tabChangeEvent) {
    this.openPanelIndex = tabChangeEvent.index;
    this.panelChanged.emit(tabChangeEvent.index);
    this.adhocScreenService.updatePanelChanged(this.openPanelIndex);
  }

  inlinePanelTabChanged(tabChangeEvent) {
    let tempInlineTab = new Tab();
    tempInlineTab = this.panelDetails.inlinePanelDetails.tabs[tabChangeEvent.index];
    tempInlineTab.tabIndex = tabChangeEvent.index;
    this.selectedInlineTabObject = tempInlineTab;
    this.inlinePanelTabChange.emit(tempInlineTab);
    this.adhocScreenService.updateInlinePanelTabChange(this.selectedInlineTabObject);

  }
  sidePanelTabChanged(tabChangeEvent) {
    let tempSideTab = new Tab();
    tempSideTab = this.panelDetails.sidePanelDetails.tabs[tabChangeEvent.index];
    tempSideTab.tabIndex = tabChangeEvent.index;
    this.selectedSideTabObject = tempSideTab;
    this.sidePanelTabChange.emit(tempSideTab);
    this.adhocScreenService.updateSidePanelTabChange(this.selectedSideTabObject);
  }

  gotoMainPanelColumnEdit(columnId: string, tableId: string, label: string) {
    const temp = this.panelDetails.mainPanelDetails.panelColumn.find(a => a.columnId === columnId &&
      a.tableId === tableId && a.label === label);
    this.adhocScreenService.updatePanelColumn(temp);
    this.showPanelEditEvent.emit(true);
  }
  gotoInlinePanelColumnEdit(columnId: string, tableId: string, label: string) {
    const temp = this.panelDetails.inlinePanelDetails.tabs[this.selectedInlineTab].panelColumn.find(a => a.columnId ===
      columnId && a.tableId === tableId && a.label === label);
    this.adhocScreenService.updatePanelColumn(temp);
    this.showPanelEditEvent.emit(true);
  }
  gotoSidePanelColumnEdit(columnId: string, tableId: string, label: string) {
    const temp = this.panelDetails.sidePanelDetails.tabs[this.selectedSideTab].panelColumn.find(a => a.columnId ===
      columnId && a.tableId === tableId && a.label === label);
    this.adhocScreenService.updatePanelColumn(temp);
    this.showPanelEditEvent.emit(true);
  }
}
