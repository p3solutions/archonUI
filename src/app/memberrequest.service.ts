import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MemberrequestService {


  private serviceUrl = 'https://jsonplaceholder.typicode.com/users';
  private url = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }
  
  getUser(){
  	console.log('chc#############3');
    const v = this.http.get(this.url).map((res: Response) => res.json());
    return v;
  }
  
}
