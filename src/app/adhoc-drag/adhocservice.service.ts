import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response } from '@angular/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProgressBarObj, ProcessDetails, ProcessDetailsObj } from '../db-extractor';
import { environment } from '../../environments/environment';
import { UserinfoService } from '../userinfo.service';
import { AdhocTableListObj, AdhocColumnListObj, TableDetailsListObj, AdhocJobParams, AdhocJobs, IngestionDataConfig } from './adhoc';

@Injectable({
  providedIn: 'root'
})

export class AdhocserviceService {

  constructor() { }
}
