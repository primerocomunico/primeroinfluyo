import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private _router: Router) { }

  // Si utilizamos el token para mantener sesión el authgard se debe comparar con el token del localStorage
  canActivate() {
    if (localStorage.getItem("authUser") != undefined) {
      return true;
    } else {
      this._router.navigate(['/home']);
      return false;
    }
  }

}
