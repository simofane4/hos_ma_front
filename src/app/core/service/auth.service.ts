import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //use  helper to decode  my token
  helper = new JwtHelperService();

  private currentUserSubject: BehaviorSubject<User>;
  currentUser: User = {
    id: null ,
    username: null ,
    password: null,
    firstName: null,
    lastName: null,
    role: null,
    token: null,
    refresh:null,
  };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.restUrl}/api/auth/token/`, {
        username,
        password,
      })
      .pipe(
        map((response) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          const decodedtoken = this.helper.decodeToken(response.access);
          console.log(decodedtoken);
          this.currentUser.id = decodedtoken.user_id;
          this.currentUser.username = decodedtoken.username || decodedtoken.name;
          this.currentUser.firstName = decodedtoken.first_name;
          this.currentUser.lastName = decodedtoken.last_name;
          this.currentUser.role = decodedtoken.role;
          this.currentUser.token = response.access;
          this.currentUser.refresh = response.refresh;

          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.currentUserSubject.next(this.currentUser);
          console.log(this.currentUser);
          return response;
        })
      );
  }

  getProfile(): Observable<any> {
    return this.http.get(`${environment.restUrl}/api/auth/me/`);
  }

  refreshToken(): Observable<any> {
    const refresh = this.currentUserValue?.refresh;
    return this.http.post(`${environment.restUrl}/api/auth/token/refresh/`, { refresh });
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
}
