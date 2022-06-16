import {Injectable} from '@angular/core';
import {SessionService} from "./session.service";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private session: SessionService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): any {
    return this.session.auth.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        console.log('Called to check access', isAuth, user);
        if (isAuth) {
          return true;
        } else {
          // this.util.presentSnackBar('Please login to continue!');
          return this.router.createUrlTree(['/login']);
        }
      }));
  }


}
