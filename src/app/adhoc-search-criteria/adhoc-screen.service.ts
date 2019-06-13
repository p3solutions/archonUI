import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchCriteria, TableColumnNode, ResultFields, SearchResult, Tab } from '../adhoc-landing-page/adhoc';

@Injectable({
  providedIn: 'root'
})
export class AdhocScreenService {
  treeMap = new Map();

  searchCriteria: BehaviorSubject<SearchCriteria[]> = new BehaviorSubject<SearchCriteria[]>([]);
  updatedSearchCriteria = this.searchCriteria.asObservable();

  searchCriterion: BehaviorSubject<SearchCriteria> = new BehaviorSubject<SearchCriteria>(new SearchCriteria());
  updatedSearchCriterion = this.searchCriterion.asObservable();

  resultField: BehaviorSubject<ResultFields> = new BehaviorSubject<ResultFields>(new ResultFields());
  updatedResultField = this.resultField.asObservable();

  treeData: BehaviorSubject<TableColumnNode[]> = new BehaviorSubject<TableColumnNode[]>([]);
  updatedTreeData = this.treeData.asObservable();

  searchResult: BehaviorSubject<SearchResult> = new BehaviorSubject<SearchResult>(new SearchResult());
  updatedSearchResult = this.searchResult.asObservable();

  panelChanged: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  updatedPanelChanged = this.panelChanged.asObservable();

  inlinePanelTabChange: BehaviorSubject<Tab> = new BehaviorSubject<Tab>(new Tab());
  updatedInlinePanelTabChange = this.inlinePanelTabChange.asObservable();

  sidePanelTabChange: BehaviorSubject<Tab> = new BehaviorSubject<Tab>(new Tab());
  updatedSidePanelTabChange = this.sidePanelTabChange.asObservable();

  updateSearchCriterion(_searchCriterion: SearchCriteria) {
    this.searchCriterion.next(_searchCriterion);
  }
  updateSearchCriteria(_searchCriteria: SearchCriteria[]) {
    console.log(_searchCriteria);
    this.searchCriteria.next(_searchCriteria);
  }
  updateResultField(_resultField: ResultFields) {
    this.resultField.next(_resultField);
  }
  updateSearchResult(_searchResult: SearchResult) {
    console.log(_searchResult);
    this.searchResult.next(_searchResult);
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

  updateTreeData(_treeData: TableColumnNode[]) {
    this.treeData.next(_treeData);
  }


  setTreeMap(_treeMap: any) {
    this.treeMap = _treeMap;
  }
  constructor() { }
}
