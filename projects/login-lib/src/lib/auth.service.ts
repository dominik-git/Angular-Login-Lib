import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {TokenModel} from './model/token.model';

@Injectable()
export class AuthService {
  private readonly tokenKey = 'access_token';
  public readonly langKey = 'lang';

  private tokenSubject: BehaviorSubject<TokenModel>;
  private refreshTokenTimeout: any;
  public token: Observable<TokenModel>;
  private clientId = '.';
  private clientSecret = '.';
  private lang = '';
  url = 'https://ais2auth-vyvoj.science.upjs.sk/oauth2/token?scope=openid';


  constructor(private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<any>(null);
    this.token = this.tokenSubject.asObservable();
  }

  public get tokenValue(): TokenModel {
    const token = JSON.parse(localStorage.getItem('access_token'));
    return token ? token : '' ;
  }
  public get language(){
    return localStorage.getItem(this.langKey);
  }

  public setLanguage(lang: string): void {
    this.lang = lang;
    localStorage.setItem(this.langKey, lang);
  }

  login(username: string, password: string) {
    const options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    const body = `grant_type=password&client_id=${this.clientId}&client_secret=${this.clientSecret}&username=${username}&password=${password}`;
    return this.http.post(this.url, body, options).pipe(
      map((token: TokenModel) => {
        localStorage.setItem(this.tokenKey, JSON.stringify(token));
        this.tokenSubject.next(token);
        this.startRefreshTokenTimer();
        return token;
      })
    );
  }

  refreshToken() {
    const credentials = btoa(
      `${this.clientId}:${this.clientSecret}`
    );
    const authorizationData = 'Basic ' + credentials;
    const options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', authorizationData),
    };
    const body = `grant_type=refresh_token&refresh_token=${this.tokenSubject.value?.refresh_token}`;
    return this.http.post(this.url, body, options).pipe(
      map((user) => {
        console.log(user);
      })
    );
  }

  initAuthService(clientId: string, clientSecret: string){
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  private startRefreshTokenTimer() {
    // set a timeout to refresh the token a minute before it expires
     const timeout = this.tokenSubject.value.expires_in * 1000 - 6000;
     this.refreshTokenTimeout = setInterval(() => this.refreshToken().subscribe(), timeout);
  }

    stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  logout(){
    this.tokenSubject.next(null);
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.langKey);
    this.stopRefreshTokenTimer();

  }
}
