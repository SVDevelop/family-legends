import { Action } from '@ngrx/store';
import {
   PlaceEditStoreInterface
} from "../interfaces/app.interface";

export interface PlaceAction extends Action { payload?: any; }

export const PLACE_EDIT_INITIAL = '[PLACE_EDIT] Initial';
export const PLACE_EDIT_SET_INFO = '[PLACE_EDIT] Set PlaceInfo';
export const PLACE_EDIT_RESET_INFO = '[PLACE_EDIT] Reset PlaceInfo';
export const PLACE_EDIT_SET_INFO__STATUS = '[PLACE_EDIT] Set PlaceEdit Status';
export const PLACE_EDIT_SET_UPDATE_DETAIL = '[PLACE_EDIT] Set PlaceNeed Update Detail';

const initialState: PlaceEditStoreInterface = {
  address: '',
  lat: 0,
  long: 0,
  name: '',
  text: '',
  status: 1,
  isNeedUpdateDetail: false
};

export function placeEditReducer(state: any = initialState, action: PlaceAction) {
  switch (action.type) {
    case PLACE_EDIT_INITIAL:
      return initialState;
    case PLACE_EDIT_SET_INFO:
      return {
        ...state,
        ...action.payload
      };
    case PLACE_EDIT_SET_INFO__STATUS:
      return {
        ...state,
        status: (state.status !== action.payload)?action.payload:state.status
      };
    case PLACE_EDIT_SET_UPDATE_DETAIL:
      return {
        ...state,
        isNeedUpdateDetail: action.payload
      };

    default:
      return state;
  }
}


