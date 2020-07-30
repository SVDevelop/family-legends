import { Action } from '@ngrx/store';
import { AppStoreInterface } from '../interfaces/app.interface';

export interface AppAction extends Action {
  payload?: any;
}

export const APP_INITIAL = '[APP] Initial';
export const APP_LOGIN_FINISH = '[APP] Login Finished';
export const APP_SET_NOW_PAGE = '[APP] Set Id Now Page';

export const APP_SET_LINKS = '[APP] Set Routes In App';
export const APP_SET_LOADER = '[APP] Loader Off';
export const APP_LOGOUT = '[APP] Logout';

export const APP_ERROR_LOGIN = '[APP] Login Error';
export const APP_ERROR_SEND_CODE = '[APP] Error Send Code';

export const APP_USER_INIT = '[APP] User Init';
export const APP_USER_SET_INFO_INIT = '[APP] Set Info By Init';
export const APP_GET_USER_INFO = '[APP] Get User Info';

export const APP_GET_PROFILE_INFO = '[APP] Get Profile Info';
export const APP_UPDATE_PROFILE_INFO = '[APP] Update Profile Info';

const defaultErrorMsg = 'Неизвестная ошибка';

const initialState: AppStoreInterface = {
  urlSendCode: '',
  urlLogin: '',
  urlRegistration: '',
  isLoader: false,

	beforeURL: '',
	afterURL: '',
	nowPage: '',

	user_id: '',
	token: '',
  phone:'',

  pageNow:'',
	time: 0,
	isSuccess: false

  ,profilePerson:null
  ,profileInfo:null
};

export function appReducer(state: any = initialState, action: AppAction) {
  switch (action.type) {
    case APP_INITIAL:
      return initialState;
    case APP_SET_LINKS:
      return {
        ...state,
        urlLogin: action.payload.urlLogin,
        urlSendCode: action.payload.urlSendCode,
        urlRegistration: action.payload.urlRegistration,
        isLoader: false
      };
    case APP_SET_LOADER:
      return {
        ...state,
        isLoader: action.payload
      };
    case APP_LOGIN_FINISH:
      return {
        ...state,
        token: action.payload.token,
        user_id: action.payload.user_id,
        phone: action.payload.phone
        // ,
        // isSuccess: true
      };
    case APP_SET_NOW_PAGE:
      return {
        ...state,
        pageNow: getStartUrl(action.payload.pageNow)
      };
    case APP_USER_SET_INFO_INIT:
      return {
        ...state,
        xId: action.payload.xId,
        profileInfo: action.payload.profileInfo,
        isSuccess: true
      };
    case APP_UPDATE_PROFILE_INFO:
      return {
        ...state,
        profilePerson: action.payload,
      };

    default:
      return state;
  }
}

function getStartUrl(url){ return url.split('/')[1]; }
