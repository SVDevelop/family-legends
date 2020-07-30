import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { appReducer } from './app';
import { authReducer } from './auth';
import { userReducer } from './user';
import { personEditReducer } from './person';
import { placeEditReducer } from './place';
import { eventEditReducer } from './event';
import { noteEditReducer } from './note';

export const forRoot = {
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  personEdit: personEditReducer,
  placeEdit: placeEditReducer,
  eventEdit: eventEditReducer,
  noteEdit: noteEditReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
	return localStorageSync({ keys: ['app', 'auth', 'user','personEdit', 'placeEdit', 'eventEdit', 'noteEdit'], rehydrate: true })(reducer);
}

export const metaReducers: [MetaReducer<any, any>] = [localStorageSyncReducer];
