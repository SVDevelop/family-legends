import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {ActionsSubject, select, Store} from "@ngrx/store";
import {
  APP_SET_LINKS,
  APP_SET_NOW_PAGE,
  APP_USER_SET_INFO_INIT,
  AppAction
} from "./store/app";
import {Observable} from "rxjs";

import {AppStoreInterface} from "./interfaces/app.interface";
import { ConfigService } from './services/config.service';
import { AppService } from './services/app.service';
import {UserInfoInterface} from "./interfaces/user.interface";
import {PERSON_EDIT_SET_INFO__STATUS} from "./store/person";
import {AUTH_SET_STAGE} from "./store/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  pageRouteStart:string;
  app$: Observable<AppStoreInterface>;
  user$: Observable<UserInfoInterface>;

  constructor(
    private store: Store<any>,
    private actionsSubject: ActionsSubject,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,

    private configService:ConfigService,
    private appService:AppService
  )
  { console.info('#APP:', this.configService.getInfoApp()); }

  ngOnInit():void{
    // this.store.dispatch({type: APP_INITIAL});
    // проставляем линки APP
    this.store.dispatch({type: APP_SET_LINKS,
      payload:<AppStoreInterface> {
        urlSendCode: this.configService.getUrl('SEND-CODE'),
        urlLogin: this.configService.getUrl('LOGIN'),
        urlRegistration: this.configService.getUrl('REGISTRATION')
      }
    });

    // синхронизация сторы и данных в сервисах
    this.app$ = this.store.pipe(select('app'));
    this.user$ = this.store.pipe(select('user'));
    this.app$.subscribe((resp: AppStoreInterface) => {
      this.appService.setAppStoreData(resp);
    });
    this.user$.subscribe((resp: UserInfoInterface) => {
      this.appService.setUserStoreData(resp);
    });

    this.actionsSubject.subscribe((action: AppAction) => {
      if (action.type === APP_USER_SET_INFO_INIT) {
          this.router.navigate(['feed']);
      }
      if (action.type === AUTH_SET_STAGE) {
        if(action.payload){
          if(action.payload.stage === 21){
            this.router.navigate(['family']);
          }
        }
      }
    });
    // ------------

    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        let i = this.location.path();
        this.pageRouteStart = this.appService.getStartUrl(i);
        this.store.dispatch({type: APP_SET_NOW_PAGE, payload: {pageNow: this.location.path()}});
        // this.store.dispatch({type: APP_SET_LOADER, payload: false});
        this.store.dispatch({type: PERSON_EDIT_SET_INFO__STATUS, payload: 1});
      }
    });
  }
  getClassPAge():string{
    //page-feed
    switch (this.pageRouteStart) {
      case 'feed':
        return 'page-feed';
    }
  }
  checkVisibleTopMenu(sRoutePath:string){
    return !(sRoutePath === 'login'
      || sRoutePath === '404'
      || sRoutePath === 'family'
    );
  }

}
