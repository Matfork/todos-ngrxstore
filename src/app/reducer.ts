import { ActionReducer } from '@ngrx/store';
import { State, getReducers, tableCreated$ } from 'ngrx-domains';
import { environment } from '../environments/environment';

import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

let _reducer: ActionReducer<State>;

tableCreated$.subscribe((domain: string) => {
  if (environment.production) {
    _reducer = combineReducers(getReducers());
  } else {
    _reducer = compose(storeFreeze, combineReducers)(getReducers());
  }
});

export function reducer(state: any, action: any) {
  return _reducer(state, action);
}