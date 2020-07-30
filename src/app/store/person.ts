import { Action } from '@ngrx/store';
import {
  PersonEditStoreInterface
} from "../interfaces/app.interface";

export interface PersonAction extends Action { payload?: any; }

export const PERSON_EDIT_INITIAL = '[PERSON_EDIT] Initial';
export const PERSON_EDIT_SET_INFO = '[PERSON_EDIT] Set Person Info';
export const PERSON_EDIT_RESET_INFO = '[PERSON_EDIT] Reset Person Info';
export const PERSON_EDIT_SET_INFO__STATUS = '[PERSON_EDIT] Set Person Edit Status';
export const PERSON_EDIT_SET_UPDATE_DETAIL = '[PERSON_EDIT] Set Person Need Update Detail';

const initialState: PersonEditStoreInterface = {
  birth_date: {
    accuracy: 1,
    date:''
  },
  first_name: '',
  id: '',
  phone: '',
  real_user: false,
  revision_id: '',
  sex: 0,
  status: 1,
  isNeedUpdateDetail: false
};

export function personEditReducer(state: any = initialState, action: PersonAction) {
  switch (action.type) {
    case PERSON_EDIT_INITIAL:
      return initialState;
    case PERSON_EDIT_SET_INFO:
      return {
        ...state,
        ...action.payload
      };
    case PERSON_EDIT_SET_INFO__STATUS:
      return {
        ...state,
        status: (state.status !== action.payload)?action.payload:state.status
      };
    case PERSON_EDIT_SET_UPDATE_DETAIL:
      return {
        ...state,
        isNeedUpdateDetail: action.payload
      };

    default:
      return state;
  }
}


