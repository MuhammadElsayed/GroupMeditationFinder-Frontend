import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
      private router: Router,
      private userService: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.userService.isAdmin()) {// check if the user role is admin
            return true;
        }

        // if not admin user, then redirect him to home
        this.router.navigate(['/home']);
        return false;
    }
}
