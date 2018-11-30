import { HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { _throw } from 'rxjs/observable/throw';
import { ArchonResponse } from './archon-response';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserinfoService } from './userinfo.service';

@Injectable()
export class ArchonHttpInterceptor implements HttpInterceptor {
    constructor(
        private userinfoService: UserinfoService
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*
        // add a custom header
        const customReq = request.clone({
            headers: request.headers.set('app-language', 'it')
        });
        // pass on the modified request object
        return next.handle(customReq);
    */
      return next
        .handle(request)
        .pipe(
            tap((ev: any) => {
                // console.log('ev', ev);
            }),
            catchError(response => {
                this.redirectHandler(response);
                return _throw(response);
            })
        );
    }
    redirectHandler(response: ArchonResponse) {
        // console.log('Processing http error', response);
        if (response) {
            if (response.error) {
                console.log(`HttpClient error message "${response.error.errorMessage}"`);
            }
            if (response.status === 401) {
                this.userinfoService.redirectOnSessionTimedOut();
            }
        }
    }
}
