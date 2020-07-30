import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from "rxjs";
import {AppStoreInterface} from "../interfaces/app.interface";
import {AuthInterface} from "../interfaces/auth.interface";

import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})

export class CanActivateService implements CanActivate{
  app$: Observable<AppStoreInterface>;

  constructor(
    private router: Router,
    private appService:AppService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const pageNextRoute: string = next.params.page;
    const pagePrevRoute: string = state.url;
    const pageUrlParams = next.fragment;

    if(this.appService.appData.isSuccess && this.appService.appData.token){
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
    // const curAuthCode = (pageUrlParams)
    //   ? this.servqueryService.getStringUrlParam(pageUrlParams, 'code=')
    //   : '';

    // if (curAuthCode) {
    //   this.store.dispatch({type: AUTH_SET_ROUTE, payload: {afterURL: pageNextRoute, beforeURL: pagePrevRoute}});
    //   this.store.dispatch({type: AUTH_SET_CODE, payload: curAuthCode});
    // } else {
    //   if (this.authData.isSuccess) {
    //     const isActualToken: number = this.httpService.checkTokenLifeTime();
    //     return this.httpService.checkedRefreshTokenQuery(isActualToken, pageNextRoute);
    //   } else {
    //     this.appService.onResetAuthCrash();
    //     // this.router.navigate(['crash']);
    //     return false;
    //   }
    // }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Observable<boolean> | Promise<boolean> | boolean  {
    return this.canActivate(route, state);
  }
}
