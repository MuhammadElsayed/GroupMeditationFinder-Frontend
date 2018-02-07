import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UserService} from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.isAuthenticated()) {// check if the user loggedin
      return true;
    }
    // return the user to the login page of he not authorized here
    this.router.navigate(['/login']);
    return false;
  }
}
