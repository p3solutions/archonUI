import { Injectable } from '@angular/core';
import { AdhocHeaderInfo } from './adhoc';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdhocService {
  adhocHeaderInfo: BehaviorSubject<AdhocHeaderInfo> = new BehaviorSubject<AdhocHeaderInfo>(null);
  updatedAdhocHeaderInfo = this.adhocHeaderInfo.asObservable();
  updateAdhocHeaderInfo(adhocHeaderInfo: AdhocHeaderInfo) {
    this.adhocHeaderInfo.next(adhocHeaderInfo);
  }
  constructor() { }
}
