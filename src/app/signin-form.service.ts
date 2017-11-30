import { Injectable } from '@angular/core';
import {SigninForm} from './signin-form';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {HttpClient,HttpHeaders,HttpClientModule} from '@angular/common/http';
@Injectable()
export class SigninFormService {


  private credentialsUrl = 'api/credentials';

  constructor(
  	private http : HttpClient) { }

  postingUserData(signinform : SigninForm) : Observable<any>{
     const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log('Signin-Form Data -->'+" "+signinform.email+" "+signinform.password);
    return this.http.put(this.credentialsUrl,signinform,httpOptions);
  }
  getUserCredentials() : Observable<any[]>{
      return this.http.get<SigninForm[]>(this.credentialsUrl);
  }

}
