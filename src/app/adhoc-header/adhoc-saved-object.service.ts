import { Injectable } from '@angular/core';
import { SearchCriteria, SearchResult, GraphDetails, NestedLinks } from '../adhoc-landing-page/adhoc';

@Injectable({
  providedIn: 'root'
})
export class AdhocSavedObjectService {
  searchCriteria: SearchCriteria[] = [];
  searchResult = new SearchResult();
  graphDetails = new GraphDetails();
  nestedLinks: NestedLinks[] = [];
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

  setNestedLinks(nestedLinks: NestedLinks[]) {
    this.nestedLinks = nestedLinks;
  }
}
