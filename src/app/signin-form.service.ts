import { Injectable } from '@angular/core';
import {SigninForm} from './signin-form';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {Router} from '@angular/router';
import {HttpClient,HttpHeaders,HttpClientModule} from '@angular/common/http';
@Injectable()
export class SigninFormService {

  outputData : any;
  private credentialsUrl = 'api/credentials';

  constructor(private http : HttpClient,private router : Router) { }

  getNavigateWorkspaceComponent(){
  	this.router.navigate(['/workspace-landing-page']);
  	console.log("Navigated successfully");
  }

  postingUserData(signinform : SigninForm) : Observable<any>{
     const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log('Signin-Form Data -->'+" "+signinform.email+" "+signinform.password);
    this.outputData = this.http.put(this.credentialsUrl,signinform,httpOptions);
    this.getNavigateWorkspaceComponent();
    return this.outputData;
  }
  getUserCredentials() : Observable<any[]>{
      return this.http.get<SigninForm[]>(this.credentialsUrl);
  }

}

 