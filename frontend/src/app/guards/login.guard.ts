import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service'
import { loggedUser, LOGIN_URL, ROOT_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor() {}

  canActivate() {
    console.log("OnlyLoggedInUsers");
    if (loggedUser) { (3)
      return true;
    } else {
      window.alert("You don't have permission to view this page"); (4)
      return false;
    }
  }
}
