import { State, Model } from 'ngrx-domains';

declare module 'ngrx-domains' {
  //Declare specific state
  export interface AppState {
    todos: Model.Todo[];
    marked: boolean;
    showAll: boolean;
    showActive: boolean;
    showCompleted: boolean;
    view: number;
  }

  interface State {
    app: AppState;
  }
}

State.app = {
  todos: [],
  marked: false,
  showAll: true,
  showActive: false,
  showCompleted: false,
  view: 0
};