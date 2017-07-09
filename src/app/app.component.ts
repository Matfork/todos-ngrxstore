import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Actions, State, Queries, Model } from 'ngrx-domains';

import 'rxjs/add/operator/take';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private text: string;

  private text$: Observable<string>;
  private todos$: Observable<Model.Todo[]>;
  private pendings$: Observable<Model.Todo[]>;
  private completeds$: Observable<Model.Todo[]>;
  private pendingsCount$: Observable<number>;
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
    this.view$ = store.select(Queries.app.getView);

    this.todos$.subscribe((list) => { this.all = list; this.refreshView(); });
    this.pendings$.subscribe((list) => { this.pendings = list; this.refreshView(); });
    this.completeds$.subscribe((list) => { this.completeds = list; this.refreshView(); });
    
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

  private remove(todo: Model.Todo): void {
    this.store.dispatch(new Actions.app.RemoveTodoAction(todo));
  }

  private showView(index: number): void {
    this.store.dispatch(new Actions.app.ShowViewAction(index));
  }

  private refreshView(): void {
    switch(this.viewId) {
      case 0: this.todos = this.all; break;
      case 1: this.todos = this.pendings; break;
      case 2: this.todos = this.completeds; break;
    }
  }
}
