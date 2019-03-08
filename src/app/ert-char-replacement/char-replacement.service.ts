import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response } from '@angular/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProgressBarObj, ProcessDetails, ProcessDetailsObj } from '../db-extractor';
import { environment } from '../../environments/environment';
import { UserinfoService } from '../userinfo.service';
import { Charreplacement } from './charreplacement';

@Injectable({
  providedIn: 'root'
})
export class CharReplacementService {
  constructor(private http: HttpClient, private userInfoService: UserinfoService) { }
  private apiUrl = environment.apiUrl;
  saveCharRecordUrl = this.apiUrl + 'dataAnalyzer/charReplacement?workspaceId=';
  getAllCharRecordUrl = this.apiUrl + 'dataAnalyzer/charReplacement?workspaceId=';
  editCharRecordUrl = this.apiUrl + 'dataAnalyzer/charReplacement?id=';
  deleteCharRecordUrl = this.apiUrl + 'dataAnalyzer/charReplacement?id=';

  saveCharRecord(workspaceId: string, charReplaceInfo: Charreplacement): Observable<any> {
    return this.http.post<any>(this.saveCharRecordUrl + workspaceId + '&codePoint=' + charReplaceInfo.codePoint +
      '&replacementChar=' + charReplaceInfo.replacementChar, null,
      { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('saveCharRecord', []))
      );
  }

  getAllCharRecord(workspaceId): Observable<Charreplacement[]> {
    return this.http.get<Charreplacement[]>(this.getAllCharRecordUrl + workspaceId,
      { headers: this.userInfoService.getHeaders() }).pipe(
        map(this.extractDataForChar),
        catchError(this.handleError('getAllCharRecord', []))
      );
  }

  editCharRecord(id: string, charReplaceInfo: Charreplacement): Observable<any> {
    return this.http.put<any>(this.editCharRecordUrl + id + '&replacementChar=' + charReplaceInfo.replacementChar, null,
      { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('updateCharRecord', []))
      );
  }

  deleteCharRecord(id: any): Observable<any> {
    return this.http.delete<any>(this.deleteCharRecordUrl + id, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('deleteCharRecord', []))
      );
  }

  private extractData(res: any) {
    const body = res;
    return body || [];
  }

  private extractDataForChar(res: any) {
    const body = res.data;
    return body || [];
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a message with the MessageService */
  private log(message: string) {
  }

}
