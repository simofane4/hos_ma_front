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
      .post<any>(`${environment.restUrl}/api/token/`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          const decodedtoken = this.helper.decodeToken(user.access);
          console.log(decodedtoken);
          this.currentUser.id = decodedtoken.user_id;
          this.currentUser.username = decodedtoken.name;
          this.currentUser.firstName = decodedtoken.first_name;
          this.currentUser.lastName = decodedtoken.last_name;
          this.currentUser.role = decodedtoken.role;
          this.currentUser.token = user.access;
          this.currentUser.refresh = user.refresh


          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.currentUserSubject.next(this.currentUser);
          console.log(this.currentUser)
          return user;
        })
      );
  }



  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
}
