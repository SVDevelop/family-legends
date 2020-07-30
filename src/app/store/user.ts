import { Action } from '@ngrx/store';
import {AppUserAnswerInterface, UserInfoInterface} from "../interfaces/user.interface";

export interface UserAction extends Action { payload?: any; }

export const USER_INITIAL = '[USER] Initial';
export const USER_SET_USER_INFO_BASE = '[USER] Set User Info';

const initialState: UserInfoInterface = {
  token: '',
  user_id: '',
  phone: '',
  default_group_id: '',
  default_person_id: '',
  groups_invited: [],
  is_new: false
};

export function userReducer(state: any = initialState, action: UserAction) {
  switch (action.type) {
    case USER_INITIAL:
      return initialState;
    case USER_SET_USER_INFO_BASE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}


