import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import { catchError, map, tap } from 'rxjs/operators';
// import { of } from 'rxjs/observable/of';

@Injectable()
export class CommonUtilityService {

  constructor(
    // private http: HttpClient
  ) { }

    getDisplayTime(timeInteger) {
        const dateTimeString = new Date(timeInteger).toString();
        const dateTimeArray = dateTimeString.split(' ');
        const month = dateTimeArray[1];
        const day = dateTimeArray[2];
        const year =  dateTimeArray[3];
        const mmhhss = dateTimeArray[4];
        const hrs = (dateTimeArray[4]).split(':')[0];
        const isNoon = (Number(hrs) < 12);
        const ampm = isNoon ? ' AM' : ' PM';
        const mediumFormat = month + ' ' + day + ', ' + year + ', ' + mmhhss + ampm;
        return mediumFormat;
    }
}