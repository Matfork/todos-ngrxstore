import { Action } from '@ngrx/store';
import { Actions, Model } from 'ngrx-domains';

export const ActionTypes = {
  ADD_TODO:         '[Todos] Add Todo',
  CHANGE_ALL:       '[Todos] Change All',
  CHANGE_TODO:      '[Todos] Change Todo',
  CLEAR_COMPLETED:  '[Todos] Clear Completed',
  EDIT_INIT:        '[Todos] Edit Init',
  EDIT_SAVE:        '[Todos] Edit Save',
  REMOVE_TODO:      '[Todos] Remove Todo',
  SHOW_VIEW:        '[Todos] Show view'
};

export class AddTodoAction implements Action {
  type = ActionTypes.ADD_TODO;

  constructor(public payload: string) { }
}

export class ChangeAllAction implements Action {
  type = ActionTypes.CHANGE_ALL;

  constructor() { }
}

export class ChangeTodoAction implements Action {
  type = ActionTypes.CHANGE_TODO;

  constructor(public payload: Model.Todo) { }
}

export class ClearCompletedAction implements Action {
  type = ActionTypes.CLEAR_COMPLETED;

  constructor() { }
}

export class EditInitAction implements Action {
  type = ActionTypes.EDIT_INIT;

  constructor(public payload: Model.Todo) { } 
}

export class EditSaveAction implements Action {
  type = ActionTypes.EDIT_SAVE;

  constructor(public payload: any) { }
}

export class RemoveTodoAction implements Action {
  type = ActionTypes.REMOVE_TODO;

  constructor(public payload: Model.Todo ) { }
}

export class ShowViewAction implements Action {
  type = ActionTypes.SHOW_VIEW;

  constructor(public payload: number) { }
}

declare module 'ngrx-domains' {
  interface Actions {
    app: {
      TYPES: typeof ActionTypes;
      AddTodoAction: typeof AddTodoAction;
      ChangeAllAction: typeof ChangeAllAction;
      ChangeTodoAction: typeof ChangeTodoAction;
      ClearCompletedAction: typeof ClearCompletedAction;
      EditInitAction: typeof EditInitAction;
      EditSaveAction: typeof EditSaveAction;
      RemoveTodoAction: typeof RemoveTodoAction;
      ShowViewAction: typeof ShowViewAction;
    }
  }
}

Actions.app = {
  TYPES: ActionTypes,
  AddTodoAction,
  ChangeAllAction,
  ChangeTodoAction,
  ClearCompletedAction,
  EditInitAction,
  EditSaveAction,
  RemoveTodoAction,
  ShowViewAction
};