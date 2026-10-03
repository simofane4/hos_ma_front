import { AuthService } from "../service/auth.service";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { environment } from 'src/environments/environment';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  refresh = false;
  constructor(private authenticationService: AuthService,
              private http:HttpClient
    ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUser = this.authenticationService.currentUserValue;

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 && !this.refresh && currentUser?.refresh) {
          this.refresh = true;
          return this.http
            .post<any>(`${environment.restUrl}/api/auth/token/refresh/`, {
              refresh: currentUser.refresh,
            })
            .pipe(
              switchMap((res: any) => {
                currentUser.token = res.access;
                localStorage.setItem(
                  'currentUser',
                  JSON.stringify(currentUser)
                );
                return next.handle(
                  request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${currentUser.token}`,
                    },
                  })
                );
              }),
              catchError((refreshErr) => {
                this.refresh = false;
                this.authenticationService.logout();
                return throwError(refreshErr);
              })
            );
        }
        this.refresh = false;
        return throwError(err);
      })
    );
  }
}
