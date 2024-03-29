import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response } from '@angular/http';
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { ManageMasterMetadata } from './master-metadata-data';
@Injectable()
export class ManageMasterMetadataService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  manage_master_metadataUrl = 'api/master_metadata';


  constructor(private http: HttpClient) { }


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
      return of(result as T);
    };
  }
  /** Log a message with the MessageService */
  private log(message: string) {
  }

}
