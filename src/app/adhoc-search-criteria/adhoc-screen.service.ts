import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchColumn, TableColumnNode, PanelColumns, MainPanelDetails, PanelDetails, Tab } from '../adhoc-landing-page/adhoc';

@Injectable({
  providedIn: 'root'
})
export class AdhocScreenService {
  searchcolumns: BehaviorSubject<SearchColumn[]> = new BehaviorSubject<SearchColumn[]>([]);
  updatedSearchColumns = this.searchcolumns.asObservable();

  searchcolumn: BehaviorSubject<SearchColumn> = new BehaviorSubject<SearchColumn>(new SearchColumn());
  updatedSearchColumn = this.searchcolumn.asObservable();

  panelcolumn: BehaviorSubject<PanelColumns> = new BehaviorSubject<PanelColumns>(new PanelColumns());
  updatedPanelColumn = this.panelcolumn.asObservable();

  treeData: BehaviorSubject<TableColumnNode[]> = new BehaviorSubject<TableColumnNode[]>([]);
  updatedTreeData = this.treeData.asObservable();

  panelDetails: BehaviorSubject<PanelDetails> = new BehaviorSubject<PanelDetails>(new PanelDetails());
  updatedPanelDetails = this.panelDetails.asObservable();

  panelChanged: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  updatedPanelChanged = this.panelChanged.asObservable();

  inlinePanelTabChange: BehaviorSubject<Tab> = new BehaviorSubject<Tab>(new Tab());
  updatedInlinePanelTabChange = this.inlinePanelTabChange.asObservable();

  sidePanelTabChange: BehaviorSubject<Tab> = new BehaviorSubject<Tab>(new Tab());
  updatedSidePanelTabChange = this.sidePanelTabChange.asObservable();


  updateSearchColumn(_searchcolumn: SearchColumn) {
    this.searchcolumn.next(_searchcolumn);
  }
  updateSearchColumns(_searchcolumns: SearchColumn[]) {
    this.searchcolumns.next(_searchcolumns);
  }
  updatePanelColumn(_panelcolumn: PanelColumns) {
    this.panelcolumn.next(_panelcolumn);
  }
  updatePanelDetails(_panelDetails: PanelDetails) {
    this.panelDetails.next(_panelDetails);
  }
  updateInlinePanelTabChange(_tab: Tab) {
    this.inlinePanelTabChange.next(_tab);
  }
  updateSidePanelTabChange(_tab: Tab) {
    this.sidePanelTabChange.next(_tab);
  }

  updatePanelChanged(_openPanelindex: number) {
    this.panelChanged.next(_openPanelindex);
  }

  updateTreeData(treeData: TableColumnNode[]) {
    this.treeData.next(treeData);
  }
  constructor() { }
}
