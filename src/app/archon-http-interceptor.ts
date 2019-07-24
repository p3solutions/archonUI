import { HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable ,  throwError as _throw } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ArchonResponse } from './archon-response';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserinfoService } from './userinfo.service';

@Injectable()
export class ArchonHttpInterceptor implements HttpInterceptor {
    constructor(
        private userinfoService: UserinfoService,
        private router: Router
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
            }),
            catchError(response => {
                this.redirectHandler(response);
                return _throw(response);
            })
        );
    }
    redirectHandler(response: ArchonResponse) {
        if (response) {
            if (response.error) {
                // console.log(`HttpClient error message "${response.error.message}"`);
            }
            if (response.status === 500 && response.error.message === 'Token is expired') {
                this.userinfoService.redirectOnSessionTimedOut();
            }
            if (response.status ===  423 && response.error.message === 'License expired') {
                this.router.navigate(['workspace/workspace-dashboard/workspace-services'], { queryParams: { license: 'no' } });
            }
    }
}

}
