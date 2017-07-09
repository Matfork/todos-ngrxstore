import { Actions, AppState, Model, State } from 'ngrx-domains';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from './model';

export function reducer(state: AppState = State.app, action: any): AppState {
  switch(action.constructor) {
    case Actions.app.AddTodoAction: {
      const text: string = action.payload;
      return Object.assign({}, state, {
        todos: [...state.todos, { id: (new Date).getTime().toString(), name: text, completed: false }]
      });
    }

    case Actions.app.ChangeTodoAction: {
      let todo: Model.Todo = action.payload;
      let index = state.todos.findIndex((item, index) => item.id == todo.id);
      let todos = state.todos.filter((item) => item.id !== todo.id);
      
      todos.splice(index, 0, { id: (new Date).getTime().toString(), name: todo.name, completed: !todo.completed });

      return Object.assign({}, state, { todos: todos });
    }

    case Actions.app.ChangeAllAction: {
      let todos: Model.Todo[] = [];
      let marked = !state.marked;
      
      state.todos.forEach((item) => {
        todos.push(Object.assign({}, item, { completed: marked }));
      });

      return Object.assign({}, state, { todos: todos, marked: marked });
    }

    case Actions.app.RemoveTodoAction: {
      const todo: Model.Todo = action.payload;

      return Object.assign({}, state, { todos: state.todos.filter((t) => t.id !== todo.id) });
    }

    case Actions.app.ShowViewAction: {
      const view: number = action.payload;      
      return Object.assign({}, state, {
        showAll: SHOW_ALL === view,
        showActive: SHOW_ACTIVE === view,
        showCompleted: SHOW_COMPLETED === view,
        view: view
      })
    }

    default: return state;
  }
}