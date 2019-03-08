import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchColumn } from '../adhoc-landing-page/adhoc';

@Injectable({
  providedIn: 'root'
})
export class AdhocScreenService {
  searchcolumns: BehaviorSubject<SearchColumn[]> = new BehaviorSubject<SearchColumn[]>([]);
  updatedSearchColumns = this.searchcolumns.asObservable();
  searchcolumn: BehaviorSubject<SearchColumn> = new BehaviorSubject<SearchColumn>(new SearchColumn());
  updatedSearchColumn = this.searchcolumn.asObservable();
  updateSearchColumn(_searchcolumn: SearchColumn) {
    this.searchcolumn.next(_searchcolumn);
  }
  updateSearchColumns(_searchcolumns: SearchColumn[]) {
    this.searchcolumns.next(_searchcolumns);
  }
  constructor() { }
}
