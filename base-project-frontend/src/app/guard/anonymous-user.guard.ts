import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of, switchMap} from 'rxjs';
import {StoreService} from "../service/store.service";

@Injectable({
  providedIn: 'root'
})
export class AnonymousUserGuard implements CanActivate {

  constructor(
    private store: StoreService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.store.getCurrentUser()
      .pipe(switchMap(user => {
        let isDefined = user.accessToken != '' && user.username != '';
        if (isDefined) {
          this.router.navigate(['home']).then();
        }
        return of(!isDefined);
      }))
  }

}
