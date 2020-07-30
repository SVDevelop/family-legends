import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';


import { ConfigService } from "../services/config.service"
import {
  APP_GET_USER_INFO,
  APP_USER_INIT,
  APP_USER_SET_INFO_INIT,
  APP_SET_LOADER,
  APP_LOGOUT,
  AppAction, APP_INITIAL, APP_GET_PROFILE_INFO, APP_UPDATE_PROFILE_INFO
} from "../store/app";
import {AppStoreInterface, InfoInterface, ProfileInfoInterface} from "../interfaces/app.interface";
import { AUTH_INITIAL } from "../store/auth";
import { USER_INITIAL } from "../store/user";
import {AuthInterface} from "../interfaces/auth.interface";
import {PERSON_EDIT_INITIAL} from "../store/person";
import {EVENT_EDIT_INITIAL} from "../store/event";
import {PLACE_EDIT_INITIAL} from "../store/place";
import {NOTE_EDIT_INITIAL} from "../store/note";

@Injectable()
export class AppEffects {
  urlAppGetInfo:string = "";
  urlAppGetProfileInfo:string = "";
  urlAppInit: string = "";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
		private router: Router,
		private actions$: Actions,
		private store$: Store<any>,
		private http: HttpClient
    , private configService:ConfigService
	) {
	  this.urlAppGetInfo = this.configService.getUrl('INFO');
    this.urlAppInit = this.configService.getUrl('INIT');
    this.urlAppGetProfileInfo = this.configService.getUrl('GET_PERSON_BASE');
  }

  initInfo$ = createEffect(() => this.actions$.pipe(
    ofType(APP_USER_INIT),
    withLatestFrom(this.store$),
    switchMap(([action, state]: [AppAction, any]) => {
      return this.http.post(this.urlAppInit, {}, this.httpOptions).pipe(
        switchMap((resp:InfoInterface) => {
          return of(
            { type: APP_USER_SET_INFO_INIT, payload:{xId: resp.group_id, profileInfo: resp}}
            ,{type: APP_UPDATE_PROFILE_INFO, payload: resp.profile }
            ,{ type: APP_SET_LOADER, payload:false}
          );
        }),
        catchError(error => {
          console.error('### ERR[APP] - INIT', error);
          return of(
            { type: APP_SET_LOADER, payload:false}
          );
        })
      );
    })
  ));

  getInfo$ = createEffect(() => this.actions$.pipe(
    ofType(APP_GET_USER_INFO),
    withLatestFrom(this.store$),
    switchMap(([action, state]: [AppAction, any]) => {
      return this.http.get(this.urlAppGetInfo, this.httpOptions).pipe(
        switchMap((resp) => {
          return of({ type: APP_SET_LOADER, payload:false}
          );
        }),
        catchError(error => {
          console.info('### ERR[APP] - INFO', error);
          return of(
            { type: APP_SET_LOADER, payload:false}
          );
        }));
    })
    )
  );

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(APP_LOGOUT),
    withLatestFrom(this.store$),
    switchMap(([action, state]: [AppAction, any]) => {
      return [
        {type: APP_INITIAL}, {type: AUTH_INITIAL}, {type: USER_INITIAL}
        , {type: PERSON_EDIT_INITIAL}, {type: EVENT_EDIT_INITIAL}, {type: PLACE_EDIT_INITIAL}, {type: NOTE_EDIT_INITIAL}
      ]
    })
    )
  );
  getProfileInfo$ = createEffect(() => this.actions$.pipe(
    ofType(APP_GET_PROFILE_INFO),
    withLatestFrom(this.store$),
    switchMap(([action, state]: [AppAction, any]) => {
      const stateApp:AppStoreInterface  = state.app;
      return this.http.get(this.urlAppGetProfileInfo+'/'+stateApp.profilePerson.id, this.httpOptions).pipe(
        switchMap((resp:ProfileInfoInterface) => {
          return [
              { type: APP_UPDATE_PROFILE_INFO, payload: resp },
            { type: APP_SET_LOADER, payload:false}
          ];
        }),
        catchError(error => {
          console.info('### ERROR[APP] - Profile view not refresh');
          return of(
            { type: APP_SET_LOADER, payload:false}
          );
        }));
    })
    )
  );

}
