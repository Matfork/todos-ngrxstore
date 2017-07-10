export interface _Todo {
  id: string;
  name: string;
  editing: boolean;
  completed: boolean;
}

export const VIEW_TYPES = { 
  SHOW_ALL: 0, 
  SHOW_ACTIVE: 1, 
  SHOW_COMPLETED: 2 
};

declare module 'ngrx-domains' {
  export namespace Model {
    export type Todo = _Todo;
  }
}