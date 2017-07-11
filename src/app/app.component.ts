import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Actions, State, Queries, Model } from 'ngrx-domains';
import { VIEW_TYPES as ViewTypes } from './domains/model';

import 'rxjs/add/operator/take';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private ViewTypes: any = ViewTypes;

  private text: string;

  private text$: Observable<string>;
  private todos$: Observable<Model.Todo[]>;
  private pendings$: Observable<Model.Todo[]>;
  private completeds$: Observable<Model.Todo[]>;
  private pendingsCount$: Observable<number>;
  private completedCount$: Observable<number>;
  private view$: Observable<number>;

  private todos: Model.Todo[];
  private viewId: number;
  private all: Model.Todo[];
  private pendings: Model.Todo[];
  private completeds: Model.Todo[];

  constructor(private store: Store<State>) {
    this.text = '';

    this.todos$ = store.select(Queries.app.getTodos);
    this.pendings$ = store.select(Queries.app.getTodosPendings);
    this.completeds$ = store.select(Queries.app.getTodosCompleted);
    this.pendingsCount$ = store.select(Queries.app.getPendingCount);
    this.completedCount$ = store.select(Queries.app.getCompletedCount);
    this.view$ = store.select(Queries.app.getView);

    this.todos$.subscribe((list) => { this.all = list; this.refreshView(); });
    this.pendings$.subscribe((list) => this.pendings = list);
    this.completeds$.subscribe((list) => this.completeds = list);
    
    this.view$.subscribe((viewId) => {
      this.viewId = viewId;
      this.refreshView();
    });
  }

  private addNew(): void {
    this.store.dispatch(new Actions.app.AddTodoAction(this.text));
    this.text = '';
  }

  private onChangeAll(): void {
    this.store.dispatch(new Actions.app.ChangeAllAction());
  }

  private onChange(todo: Model.Todo): void {
    this.store.dispatch(new Actions.app.ChangeTodoAction(todo));
  }

  private edit(todo: Model.Todo): void {
    this.store.dispatch(new Actions.app.EditInitAction(todo));
  }

  private saveEdit(todo: Model.Todo, text: string): void {
    this.store.dispatch(new Actions.app.EditSaveAction({ todo: todo, text: text }));
  }

  private remove(todo: Model.Todo): void {
    this.store.dispatch(new Actions.app.RemoveTodoAction(todo));
  }

  private showView(index: number): void {
    this.store.dispatch(new Actions.app.ShowViewAction(index));
  }

  private clearCompleted(): void {
    this.store.dispatch(new Actions.app.ClearCompletedAction());
  }

  private refreshView(): void {
    switch(this.viewId) {
      case ViewTypes.SHOW_ALL: this.todos = this.all; break;
      case ViewTypes.SHOW_ACTIVE: this.todos = this.pendings; break;
      case ViewTypes.SHOW_COMPLETED: this.todos = this.completeds; break;
    }
  }
}
