import { Injectable } from '@angular/core';
import { SearchCriteria, SearchResult, GraphDetails, NestedLinks, Adhoc } from '../adhoc-landing-page/adhoc';

@Injectable({
  providedIn: 'root'
})
export class AdhocSavedObjectService {
  searchCriteria: SearchCriteria[] = [];
  searchResult = new SearchResult();
  graphDetails = new GraphDetails();
  screenInfoObject = new Adhoc();
  primarytableIdWhenNoRelation = '';
  constructor() { }
  setSearchCriteria(searchCriteria: SearchCriteria[]) {
    this.searchCriteria = searchCriteria;
  }

  setSearchResult(searchResult: SearchResult) {
    this.searchResult = searchResult;
  }

  setGraphDetails(graphDetails: GraphDetails) {
    this.graphDetails = graphDetails;
  }

  setScreenInfoObject(screenInfoObject: Adhoc) {
    this.screenInfoObject = screenInfoObject;
  }

  setPrimarytableIdWhenNoRelation(primarytableIdWhenNoRelation) {
    this.primarytableIdWhenNoRelation = primarytableIdWhenNoRelation;
  }
}
