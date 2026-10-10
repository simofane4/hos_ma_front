import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

export interface AuthProfile {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  role: string;
  cabinet_id: number;
}

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
    email: null,
    role: null,
    cabinetId: null,
    isActive: null,
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
          this.currentUser.token = response.access;
          this.currentUser.refresh = response.refresh;
          this.currentUser.username = username;
          // publish the tokens first so the profile request is authorized
          this.persist();
          return response;
        }),
        switchMap(() => this.getProfile()),
        map((profile: AuthProfile) => {
          this.applyProfile(profile);
          return profile;
        })
      );
  }

  getProfile(): Observable<AuthProfile> {
    return this.http.get<AuthProfile>(`${environment.restUrl}/api/auth/me/`);
  }

  /** Re-reads the profile of the currently authenticated user. */
  loadProfile(): Observable<AuthProfile> {
    return this.getProfile().pipe(map((profile) => {
      this.applyProfile(profile);
      return profile;
    }));
  }

  refreshToken(): Observable<any> {
    const refresh = this.currentUserValue?.refresh;
    return this.http.post(`${environment.restUrl}/api/auth/token/refresh/`, { refresh });
  }

  /** Stores a new token pair, keeping the already loaded profile intact. */
  setTokens(access: string, refresh?: string): void {
    if (!this.currentUser) {
      return;
    }
    this.currentUser.token = access;
    if (refresh) {
      this.currentUser.refresh = refresh;
    }
    this.persist();
  }

  private applyProfile(profile: AuthProfile): void {
    this.currentUser.id = profile.id;
    this.currentUser.username = profile.username;
    this.currentUser.firstName = profile.first_name;
    this.currentUser.lastName = profile.last_name;
    this.currentUser.email = profile.email;
    this.currentUser.isActive = profile.is_active;
    this.currentUser.role = profile.role;
    this.currentUser.cabinetId = profile.cabinet_id;
    this.persist();
  }

  private persist(): void {
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.currentUserSubject.next(this.currentUser);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
}
