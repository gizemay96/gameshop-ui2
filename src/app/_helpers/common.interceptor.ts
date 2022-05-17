import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { CommonService } from '@app/services/common.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor(private commonService: CommonService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = window.sessionStorage.getItem('token');
    return next.handle(request.clone({ setHeaders: { Authorization: `${token}` } }))
      .pipe(map((res: any) => res),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = this.setError(error);
          this.commonService.errorSnackBar(errorMessage);
          return throwError(error);
        }));
  }


  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown Error';
    if (error.error instanceof ErrorEvent) {
      // Client side error
      errorMessage = error.error.message;
    } else {
      // Server side error
      if (error.status !== 0) {
        errorMessage = error.error.responseMessage;
      }
    }
    return errorMessage;
  }


}
