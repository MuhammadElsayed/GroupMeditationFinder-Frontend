import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // extract error message from http body if an error occurs
        return next.handle(request).catch(errorResponse => {
            console.log(errorResponse.error);
            let msg: string;
            if (errorResponse.error.errors) { // has multiple error messages
              // @TODO: start searching throw whole childs and combine messages rather than these conditions
              if (errorResponse.error.errors.email) {
                msg = errorResponse.error.errors.email.msg;
              } else {
                msg = errorResponse.error.errors.password.msg;
              }
            } else {
              msg = errorResponse.error.msg;
            }
            return Observable.throw(msg);
        });
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
