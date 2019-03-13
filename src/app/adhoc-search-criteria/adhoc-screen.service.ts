import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchColumn, TableColumnNode } from '../adhoc-landing-page/adhoc';

@Injectable({
  providedIn: 'root'
})
export class AdhocScreenService {
  searchcolumns: BehaviorSubject<SearchColumn[]> = new BehaviorSubject<SearchColumn[]>([]);
  updatedSearchColumns = this.searchcolumns.asObservable();
  searchcolumn: BehaviorSubject<SearchColumn> = new BehaviorSubject<SearchColumn>(new SearchColumn());
  updatedSearchColumn = this.searchcolumn.asObservable();
  panelcolumns: BehaviorSubject<SearchColumn[]> = new BehaviorSubject<SearchColumn[]>([]);
  updatedPanelColumns = this.panelcolumns.asObservable();
  treeData: BehaviorSubject<TableColumnNode[]> = new BehaviorSubject<TableColumnNode[]>([]);
  updatedTreeData = this.treeData.asObservable();
  updateSearchColumn(_searchcolumn: SearchColumn) {
    this.searchcolumn.next(_searchcolumn);
  }
  updateSearchColumns(_searchcolumns: SearchColumn[]) {
    this.searchcolumns.next(_searchcolumns);
  }
  updatePanelColumns(_panelcolumns: SearchColumn[]) {
    this.panelcolumns.next(_panelcolumns);
  }
  updateTreeData(treeData: TableColumnNode[]) {
    this.treeData.next(treeData);
  }
  constructor() { }
}
