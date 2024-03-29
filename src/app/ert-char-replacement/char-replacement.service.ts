import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserinfoService } from '../userinfo.service';
import { Charreplacement } from './charreplacement';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class CharReplacementService {
  constructor(
    private http: HttpClient,
    private userInfoService: UserinfoService,
    private environment: EnvironmentService
  ) { }
  private apiUrl = this.environment.apiUrl;
  saveCharRecordUrl = this.apiUrl + 'dataAnalyzer/charReplacement?workspaceId=';
  getAllCharRecordUrl = this.apiUrl + 'dataAnalyzer/charReplacement?workspaceId=';
  editCharRecordUrl = this.apiUrl + 'dataAnalyzer/charReplacement?id=';
  deleteCharRecordUrl = this.apiUrl + 'dataAnalyzer/charReplacement?id=';

  saveCharRecord(workspaceId: string, charReplaceInfo: Charreplacement): Observable<any> {
    return this.http.post<any>(this.saveCharRecordUrl + workspaceId + '&codePoint=' + charReplaceInfo.codePoint +
      '&replacementChar=' + charReplaceInfo.replacementChar, null,
      { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData));
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
      pipe(map(this.extractData));
  }

  deleteCharRecord(id: any): Observable<any> {
    return this.http.delete<any>(this.deleteCharRecordUrl + id, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData));
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
