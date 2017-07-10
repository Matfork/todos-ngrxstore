import { Actions, AppState, Model, State } from 'ngrx-domains';

export function reducer(state: AppState = State.app, action: any): AppState {
  switch(action.constructor) {
    case Actions.app.AddTodoAction: {
      const text: string = action.payload;
      return Object.assign({}, state, {
        todos: [...state.todos, { id: (new Date).getTime().toString(), name: text, editing: false, completed: false }]
      });
    }

    case Actions.app.ChangeTodoAction: {
      let todo: Model.Todo = action.payload;
      let index = state.todos.findIndex((item) => item.id == todo.id);
      let todos = state.todos.filter((item) => item.id !== todo.id);
      
      todos.splice(index, 0, Object.assign({}, todo, { completed: !todo.completed }));

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

    case Actions.app.ClearCompletedAction: {
      return Object.assign({}, state, { todos: state.todos.filter((t) => !t.completed )});
    }

    case Actions.app.EditInitAction: {
      let todo: Model.Todo = action.payload;
      let index = state.todos.findIndex((item) => item.id == todo.id);
      let todos = state.todos.filter((item) => item.id !== todo.id);
      
      todos.splice(index, 0, Object.assign({}, todo, { editing: true }));

      return Object.assign({}, state, { todos: todos });
    }

    case Actions.app.RemoveTodoAction: {
      const todo: Model.Todo = action.payload;

      return Object.assign({}, state, { todos: state.todos.filter((t) => t.id !== todo.id) });
    }

    case Actions.app.ShowViewAction: {  
      return Object.assign({}, state, { view: action.payload })
    }

    default: return state;
  }
}