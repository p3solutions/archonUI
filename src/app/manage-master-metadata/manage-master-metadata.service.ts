import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { ManageMasterMetadata } from '../master-metadata-data';
import { environment } from '../../environments/environment';
import { UserinfoService } from '../userinfo.service';

@Injectable()
export class ManageMasterMetadataService {
  private apiUrl = environment.apiUrl;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  saveMMRVersionUrl  = this.apiUrl + 'metalyzer/generateMMR?workspaceId=';
  getMMRVersionListUrl = this.apiUrl + 'metalyzer/getVersionNumberList?workspaceId=';
  manage_master_metadataUrl = 'api/master_metadata';

  constructor(private http: HttpClient, private userInfoService: UserinfoService) { }


  getManageMasterMetaData(): Observable<ManageMasterMetadata[]> {
    return this.http.get<ManageMasterMetadata[]>(this.manage_master_metadataUrl).pipe(
      catchError(this.handleError('master-meta data', []))
    );
  }
  removeManageMasterData(manageMasterObj: ManageMasterMetadata | number): Observable<ManageMasterMetadata> {
    const slNo = typeof manageMasterObj === 'number' ? manageMasterObj : manageMasterObj.slNo;
    const url = '${this.manage_master_metadataUrl}/${slNo}';
    return this.http.delete<ManageMasterMetadata>(url).pipe(
      catchError(this.handleError<ManageMasterMetadata>('master-meta data')));
  }

  getMMRVersionList(workspaceId: string): Observable<ManageMasterMetadata[]> {
    return this.http.get<ManageMasterMetadata[]>(this.getMMRVersionListUrl + workspaceId,
      { headers: this.userInfoService.getHeaders() }).pipe(
        map(this.extractData),
        catchError(this.handleError('getMMRVersionList', []))
      );
  }

  saveMMRVersion(workspaceId: string, mmrVersion: string, desc: string): Observable<any> {
    return this.http.post<any>(this.saveMMRVersionUrl + workspaceId + '&versionNo=' + mmrVersion + '&description=' + desc, null,
      { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractDataForMMRSave));
  }


  private extractData(res: any) {
    const body = res.data['MMR Versions'];
    return body || [];
  }

  private extractDataForMMRSave(res: any) {
    const body = res;
    return body || [];
  }

  // remove_Master_Metadata(): Observable<Manage_Master_Metadata[]>{
  //   return this.http.delete()
  // }
  // * Handle HttpClient operation that failed.
  // * Let the app continue.
  // * @param operation - name of the operation that failed
  // * @param result - optional value to return as the observable result
  // */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
  /** Log a message with the MessageService */
  private log(message: string) {
  }

}
