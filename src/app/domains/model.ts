export interface _Todo {
  id: string;
  name: string;
  completed: boolean;
}

export const SHOW_ALL: number = 0;
export const SHOW_ACTIVE: number = 1;
export const SHOW_COMPLETED: number = 2;

declare module 'ngrx-domains' {
  export namespace Model {
    export type Todo = _Todo;
  }
}