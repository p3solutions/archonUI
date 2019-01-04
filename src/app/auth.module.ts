// import { NgModule } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { RequestOptions } from '@angular/http';

// import { AuthHttp, AuthConfig } from '@auth0/angular-jwt';

// export function authHttpServiceFactory(http: HttpClient, options: RequestOptions) {
//   return new AuthHttp(new AuthConfig({
//     tokenName: 'authToken',
//   }
//   ), http, options);
// }

// @NgModule({
//   providers: [
//     {
//       provide: AuthHttp,
//       useFactory: authHttpServiceFactory,
//       deps: [HttpClient, RequestOptions]
//     }
//   ]
// })
// export class AuthModule { }
