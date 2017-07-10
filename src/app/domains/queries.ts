import { AppState, Model, Queries, Query, Root, combineRootFactory } from 'ngrx-domains';

const fromRoot = combineRootFactory<AppState>('app');

export interface AppQueries {
  getTodos: Query<Model.Todo[]>;
  getTodosPendings: Query<Model.Todo[]>;
  getTodosCompleted: Query<Model.Todo[]>;
  getPendingCount: Query<number>;
  getCompletedCount: Query<number>;
  getView: Query<number>;
}

declare module 'ngrx-domains' {
  interface Root {
    app: Query<AppState>;
  }

  interface Queries {
    app: AppQueries;
  }
}

Queries.app = {
  getTodos: fromRoot(state => state.todos),
  getTodosPendings: fromRoot(state => state.todos.filter((item) => !item.completed)),
  getTodosCompleted: fromRoot(state => state.todos.filter((item) => item.completed)),
  getPendingCount: fromRoot(state => state.todos.filter((item) => !item.completed).length),
  getCompletedCount: fromRoot(state => state.todos.filter((item) => item.completed).length),
  getView: fromRoot(state => state.view)
};