import { Injectable } from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot,Router} from '@angular/router'
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable({
  providedIn: 'root'
})
export class ChatRouteGaurdService {

  constructor(private router :Router) { }
  canActivate(route:ActivatedRouteSnapshot):boolean{
    console.log('In gaurd route');
    if(Cookie.get('authToken')==undefined || Cookie.get('authToken')==''|| Cookie.get('authToken')==null)
   { this.router.navigate(['/']);
    return false;
    console.log('In false')
   }
   else
   return true;
   console.log('In true')
  }
}
