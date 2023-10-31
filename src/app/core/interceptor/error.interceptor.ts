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
        if (err.status === 401 && !this.refresh) {
          this.refresh = true;
          console.log("refresh its  work !! ")// hada khessni n7aydo
          let refreshToken = currentUser.refresh
          console.log(refreshToken)
          return this.http.post<any>(`${environment.restUrl}/api/token/refresh/`,{"refresh":refreshToken}).pipe(
          switchMap((res:any)=>{
            currentUser.token = res.access;
            localStorage.setItem('', JSON.stringify(currentUser));
            console.log(currentUser)
            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${currentUser.token}`,
              },
            }))
          })
        )

        }
        this.refresh = false;

      })
    );
  }
}
