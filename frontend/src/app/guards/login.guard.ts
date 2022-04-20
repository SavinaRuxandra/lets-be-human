import { Injectable } from '@angular/core';
import {
  CanActivate
} from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService) {}

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
