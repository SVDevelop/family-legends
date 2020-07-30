import { Action } from '@ngrx/store';
import {AuthInterface} from "../interfaces/auth.interface";
export interface AuthAction extends Action { payload?: any; }

export const AUTH_INITIAL = '[AUTH] Initial';
export const AUTH_SET_AUTH_URL = '[AUTH] Set URL';
export const AUTH_SEND_CODE = '[AUTH] Send Code';
export const AUTH_LOGIN = '[AUTH] Login';
export const AUTH_SUCCESS = '[AUTH] Succes';

export const AUTH_SET_STAGE = '[AUTH] Set Stage';
export const AUTH_LOADER = '[AUTH] LOADER';
export const AUTH_SET_DISABLED_CONTROL = '[AUTH] Set Disabled Control';

export const AUTH_REGISTRATION_SEND_CODE = '[AUTH] Send Registration Code';
export const AUTH_REGISTRATION_LOGIN = '[AUTH] Send Registration Login';


const initialState: AuthInterface = {
  urlSendCode:'',
  urlLogin:'',
  urlRegistration:'',
  login: '',
  // STAGE :::
  // 1 - enter-login, 2 - send-code, 3- error - phone, 4 - error code, 5 - need resend code
  // registration:::  11 - start , 12 send_code , 13 error - phone, 14 - error code, 15 - error other
  // 21 - create new family
  stage: 1,
	isSuccess: false,
  isLoader: false,
  disabledControl: {
    control: null,
    isDisable: false
  }
};

export function authReducer(state: any = initialState, action: AuthAction) {
  switch (action.type) {
    case AUTH_INITIAL:
      return initialState;
    case AUTH_LOADER:
      return {
        ...state,
        isLoader: action.payload.isLoader,
      };
    case AUTH_SET_DISABLED_CONTROL:
      return {
        ...state,
        disabledControl: {
          control: action.payload.disabledControl.control,
          isDisable: action.payload.disabledControl.isDisable
        }
      };
    case AUTH_SET_STAGE:
      return {
        ...state,
        stage: action.payload.stage,
      };
    case AUTH_SET_AUTH_URL:
      return {
        ...state,
        urlLogin: action.payload.urlLogin,
        urlSendCode: action.payload.urlSendCode,
        urlRegistration: action.payload.urlRegistration
        ,stage: 1
        , isLoader: false,
        isSuccess: false
        ,disabledControl: {
          control: null,
          isDisable: false
        }
      };
    case AUTH_SEND_CODE:
      return {
        ...state,
        login: action.payload.login
      };
    case AUTH_REGISTRATION_SEND_CODE:
      return {
        ...state,
        login: action.payload.login
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isSuccess: action.payload.isSucces
        ,login: ''
        ,isLoader: false
        ,disabledControl: {
          control: null,
          isDisable: false,
        }
      };
    default:
      return state;
  }
}


