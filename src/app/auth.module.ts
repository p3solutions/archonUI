import { NgModule } from '@angular/core';
import { HttpClient, RequestOptions } from '@angular/http';

import { AuthHttp, AuthConfig } from './angular-jwt/angular-jwt';

export function authHttpServiceFactory(http: HttpClient, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'authToken',
  }
  ), http, options);
}

@NgModule({
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [HttpClient, RequestOptions]
    }
  ]
})
export class AuthModule { }
