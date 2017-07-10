import { State, Model } from 'ngrx-domains';

declare module 'ngrx-domains' {
  //Declare specific state
  export interface AppState {
    todos: Model.Todo[];
    marked: boolean;
    view: number;
  }

  interface State {
    app: AppState;
  }
}

State.app = {
  todos: [],
  marked: false,
  view: 0
};