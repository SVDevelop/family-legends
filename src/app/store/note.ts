import { Action } from '@ngrx/store';
import {
  NoteEditStoreInterface
} from "../interfaces/app.interface";

export interface NoteAction extends Action { payload?: any; }

export const NOTE_EDIT_INITIAL = '[NOTE_EDIT] Initial';
export const NOTE_EDIT_SET_INFO = '[NOTE_EDIT] Set EVENTInfo';
export const NOTE_EDIT_RESET_INFO = '[NOTE_EDIT] Reset EVENTInfo';
export const NOTE_EDIT_SET_INFO__STATUS = '[NOTE_EDIT] Set EVENTEdit Status';
export const NOTE_EDIT_SET_UPDATE_DETAIL = '[NOTE_EDIT] Set EVENTNeed Update Detail';

const initialState: NoteEditStoreInterface = {
  attachments: null,
  events: null,
  persons: null,
  places: null,
  text: null,
  id:null,
  status: 1,
  isNeedUpdateDetail: false
};

export function noteEditReducer(state: any = initialState, action: NoteAction) {
  switch (action.type) {
    case NOTE_EDIT_INITIAL:
      return initialState;
    case NOTE_EDIT_SET_INFO:
      return {
        ...state,
        ...action.payload
      };
    case NOTE_EDIT_SET_INFO__STATUS:
      return {
        ...state,
        status: (state.status !== action.payload)?action.payload:state.status
      };
    case NOTE_EDIT_SET_UPDATE_DETAIL:
      return {
        ...state,
        isNeedUpdateDetail: action.payload
      };

    default:
      return state;
  }
}


