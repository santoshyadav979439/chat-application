import { Injectable } from '@angular/core';
//import {Observable,of,from} from 'rxjs'
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {HttpErrorResponse,HttpParams} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import {Cookie} from 'ng2-cookies/ng2-cookies'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {
private url ='https://chatapi.edwisor.com';
  constructor(public http:HttpClient) { }
 
  publicSignupFunction(data): Observable<any> {
    const params = new HttpParams()
    .set ('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('mobile',data.mobile)
    .set('email',data.email)
    .set('password',data.password)
    .set('apiKey',data.apiKey);
    let a=`${this.url}/api/v1/user/signup`;
    let param=params;
    console.log('hit url is'+a);
    console.log('param is'+JSON.stringify(param));
    return this.http.post(`${this.url}/api/v1/users/signup`,params);
  }
public SignInFunction(data): Observable<any>{
  const params = new HttpParams()
  .set('email',data.email)
  .set('password',data.password)
  return this.http.post(`${this.url}/api/v1/users/login`,params);
}
public getUserInformationFromlocalStorage: any =() =>
{
  return JSON.parse(localStorage.getItem('userInfo'));
}
public setUserInformationFromlocalStorage: any =(data) =>
{
  localStorage.setItem('userInfo',JSON.stringify(data));
} 
public logout(): Observable<any> {

  const params = new HttpParams()
    .set('authToken', Cookie.get('authtoken'))

  return this.http.post(`${this.url}/api/v1/users/logout`, params);

} // end logout function
}
