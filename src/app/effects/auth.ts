import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, switchMap, withLatestFrom} from 'rxjs/operators';
import { of } from 'rxjs';


import { AuthBaseInterface, AuthQueryInterface } from '../interfaces/auth.interface';
import { AuthInterface } from "../interfaces/auth.interface";
import {AppUserAnswerInterface} from "../interfaces/user.interface";

import {APP_LOGIN_FINISH, APP_USER_INIT, APP_USER_SET_INFO_INIT} from '../store/app';
import {
  AUTH_LOADER,
  AUTH_LOGIN, AUTH_REGISTRATION_LOGIN, AUTH_REGISTRATION_SEND_CODE,
  AUTH_SEND_CODE,
  AUTH_SET_DISABLED_CONTROL,
  AUTH_SET_STAGE,
  AUTH_SUCCESS,
  AuthAction
} from "../store/auth";
import {USER_SET_USER_INFO_BASE} from "../store/user";

const optionsPOST  = {
  // headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable()
export class AuthEffects {
	constructor(
		private actions$: Actions,
		private store$: Store<any>,
		private http: HttpClient
	) { }

  sendCode$ = createEffect(() => this.actions$.pipe(
    ofType(AUTH_SEND_CODE),
    withLatestFrom(this.store$),
    switchMap(([action, state]: [AuthAction, any]) => {
      const stateApp:AuthInterface  = state.auth;
      const cBODY: AuthBaseInterface = {
        login: action.payload.login
      };
      return this.http.post(stateApp.urlSendCode, cBODY, optionsPOST).pipe(
          switchMap((resp) => {
              return of({ type: AUTH_LOADER, payload:{isLoader: false}},
                {type: AUTH_SET_STAGE, payload: {stage: 2 }}
              );
          }),
        catchError(error => {
          return of({ type: AUTH_LOADER, payload:{isLoader: false}},
            {type: AUTH_SET_DISABLED_CONTROL, payload: { disabledControl:{control: 'lphone', isDisable: false}}},
            {type: AUTH_SET_STAGE, payload: {stage: 3 }}
          );
        }));
    })
    )
  );

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AUTH_LOGIN),
    withLatestFrom(this.store$),
    switchMap(([action, state]: [AuthAction, any]) => {
      const stateApp:AuthInterface  = state.auth;
      const cBODY: AuthQueryInterface = {
        code: parseInt(action.payload.code),
        login: action.payload.login
      };

      return this.http.post(stateApp.urlLogin, cBODY, optionsPOST).pipe(
        switchMap((resp:AppUserAnswerInterface) => {
          if(resp.token && resp.user_id){
            return of({ type: APP_LOGIN_FINISH, payload: {
                token: resp.token,
                user_id: resp.user_id,
                phone: resp.phone
              }},
              { type: AUTH_SUCCESS, payload: { isSucces: true }},
              { type: USER_SET_USER_INFO_BASE, payload: resp},
              { type: APP_USER_INIT },

              // { type: APP_USER_SET_INFO_INIT, payload:{xId: resp.default_group_id, profileInfo: {
              //     profile: {
              //       first_name: 'tttttt'
              //     }
              //     }
              // }},

              { type: AUTH_LOADER, payload:{isLoader: false}},
              {type: AUTH_SET_STAGE, payload: {stage: 99 }}
            );
          }
        }),
        catchError(error => {
          return of({type: AUTH_LOADER, payload:{isLoader: false}},
            {type: AUTH_SET_DISABLED_CONTROL, payload: { disabledControl:{control: 'lcode', isDisable: false} }}
            ,{type: AUTH_SET_STAGE, payload: {stage: 4 }});
        }));
    })
    )
  );

  sendRegistrationCode$ = createEffect(() => this.actions$.pipe(
    ofType(AUTH_REGISTRATION_SEND_CODE),
    withLatestFrom(this.store$),
    switchMap(([action, state]: [AuthAction, any]) => {
      const stateApp:AuthInterface  = state.auth;
      const cBODY: AuthBaseInterface = {
        login: action.payload.login
      };
      return this.http.post(stateApp.urlSendCode, cBODY, optionsPOST).pipe(
        switchMap((resp) => {
          return of({ type: AUTH_LOADER, payload:{isLoader: false}},
            {type: AUTH_SET_STAGE, payload: {stage: 12 }}
          );
        }),
        catchError(error => {
          return of({ type: AUTH_LOADER, payload:{isLoader: false}},
            {type: AUTH_SET_DISABLED_CONTROL, payload: { disabledControl:{control: 'uphone', isDisable: false}}},
            {type: AUTH_SET_STAGE, payload: {stage: 13 }}
          );
        }));
    })
    )
  );

  loginReg$ = createEffect(() => this.actions$.pipe(
    ofType(AUTH_REGISTRATION_LOGIN),
    withLatestFrom(this.store$),
    switchMap(([action, state]: [AuthAction, any]) => {
      const stateApp:AuthInterface  = state.auth;
      const cBODY: AuthQueryInterface = {
        code: parseInt(action.payload.code),
        login: action.payload.login
      };

      return this.http.post(stateApp.urlLogin, cBODY, optionsPOST).pipe(
        switchMap((resp:AppUserAnswerInterface) => {
          if(resp.token && resp.user_id){
            return of({ type: APP_LOGIN_FINISH, payload: {
                  token: resp.token,
                  user_id: resp.user_id,
                  phone: resp.phone
                }},
              { type: AUTH_SUCCESS, payload: { isSucces: true }},
              { type: USER_SET_USER_INFO_BASE, payload: resp},
              { type: AUTH_LOADER, payload:{isLoader: false}},
              {type: AUTH_SET_STAGE, payload: {stage: 21 }}
            );
          }
        }),
        catchError(error => {
          return of({type: AUTH_LOADER, payload:{isLoader: false}},
            {type: AUTH_SET_DISABLED_CONTROL, payload: { disabledControl:{control: 'regCode', isDisable: false} }}
            ,{type: AUTH_SET_STAGE, payload: {stage: 14 }});
        }));
    })
    )
  );
}
