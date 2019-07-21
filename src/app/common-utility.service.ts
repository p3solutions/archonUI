import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { catchError, map, tap } from 'rxjs/operators';
// import { of } from 'rxjs/observable/of';

@Injectable()
export class CommonUtilityService {
  _filter = '';
  filteredData: any;
  constructor(
    // private http: HttpClient
  ) { }

  getDisplayTime(timeInteger) {
    const dateTimeString = new Date(timeInteger).toString();
    const dateTimeArray = dateTimeString.split(' ');
    const month = dateTimeArray[1];
    const day = dateTimeArray[2];
    const year = dateTimeArray[3];
    const mmhhss = dateTimeArray[4];
    const hrs = (dateTimeArray[4]).split(':')[0];
    const isNoon = (Number(hrs) < 12);
    const ampm = isNoon ? ' AM' : ' PM';
    const mediumFormat = month + ' ' + day + ', ' + year + ', ' + mmhhss + ampm;
    return mediumFormat;
  }
  groupOutArray(list, groupNumber) {
    let index = 0;
    let array = [];
    let groupedArray = [];
    if (groupNumber > 1) {
      list.forEach(element => {
        if (index === groupNumber) {
          groupedArray.push(array);
          index = 0;
          array = [];
        }
        array.push(element);
        index++;
      });
      groupedArray.push(array);
    } else {
      groupedArray = list;
    }
    return groupedArray;
  }
  toggleFlexCard(cardId, toShow, _event) {
    _event.stopPropagation();
    const card = document.getElementById(cardId);
    if (toShow) {
      card.classList.add('reveal');
    } else {
      card.classList.remove('reveal');
    }
  }

  checkPropertiesHasValue(obj) {
    for (const key in obj) {
      if (obj[key] !== null && obj[key] !== '') {
        return false;
      }
    }
    return true;
  }

// Start- filter by all keys in object.

  filterPredicate: ((data: any, filter: string) => boolean) = (data: any, filter: string): boolean => {
    const accumulator = (currentTerm, key) => currentTerm + data[key];
    const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
    const transformedFilter = filter.trim().toLowerCase();
    return dataStr.indexOf(transformedFilter) !== -1;
  }

  _filterData(dataSource: any) {
    this.filteredData =
      !this.filter ? dataSource : dataSource.filter(obj => this.filterPredicate(obj, this.filter));
    const a = JSON.parse(JSON.stringify(this.filteredData));
    return a;
  }



  get filter(): string { return this._filter; }
  set filter(filter: string) {
    this._filter = filter;
  }

// End



}
