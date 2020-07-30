import { Action } from '@ngrx/store';
import {
  AttachmentInterface, DateInterface,
  EventEditStoreInterface
} from "../interfaces/app.interface";

export interface EventAction extends Action { payload?: any; }

export const EVENT_EDIT_INITIAL = '[EVENT_EDIT] Initial';
export const EVENT_EDIT_SET_INFO = '[EVENT_EDIT] Set EVENTInfo';
export const EVENT_EDIT_RESET_INFO = '[EVENT_EDIT] Reset EVENTInfo';
export const EVENT_EDIT_SET_INFO__STATUS = '[EVENT_EDIT] Set EVENTEdit Status';
export const EVENT_EDIT_SET_UPDATE_DETAIL = '[EVENT_EDIT] Set EVENTNeed Update Detail';

const initialState: EventEditStoreInterface = {
  attachment: null,
  date_event: null,
  name: null,
  text: null,
  id:null,
  status: 1,
  isNeedUpdateDetail: false
};

export function eventEditReducer(state: any = initialState, action: EventAction) {
  switch (action.type) {
    case EVENT_EDIT_INITIAL:
      return initialState;
    case EVENT_EDIT_SET_INFO:
      return {
        ...state,
        ...action.payload
      };
    case EVENT_EDIT_SET_INFO__STATUS:
      return {
        ...state,
        status: (state.status !== action.payload)?action.payload:state.status
      };
    case EVENT_EDIT_SET_UPDATE_DETAIL:
      return {
        ...state,
        isNeedUpdateDetail: action.payload
      };

    default:
      return state;
  }
}


