import { CommonModule } from '@angular/common';
import { Component, inject, resource, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { Todo } from '@prisma/client';
import { TodoService } from '../services/todo.service';
import { ItemInterface } from '../store/todo.model';
import { TodoStore } from '../store/todo.state';

@Component({
  selector: 'lib-todo-list',
  imports: [CommonModule, ...MATERIAL],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  // Router configuration
  readonly router = inject(Router)
  routeToDetail = "todos/todo";

// Data access through store
  #store = inject(TodoStore);
  items = this.#store.todosResource;
  itemsEntities = this.#store.todoEntities;
  loading = this.#store.loading;
  errorLoading = this.#store.todosResource.error;

// Material table configuration
dataSource = new MatTableDataSource<ItemInterface>;
displayedColumns: string[] = ['select','numSeq','title'];
readonly paginator = viewChild(MatPaginator);
readonly sort = viewChild(MatSort);

fetchData(): void {
  this.dataSource = new MatTableDataSource(this.itemsEntities());
  this.dataSource.paginator = this.paginator()!;
  this.dataSource.sort = this.sort()!;
}

// ngAfterViewInit(): void {
//   this.fetchData();
// }


// Data access through service / Direct access to DB
  private readonly todoService = inject(TodoService);
  todos = resource<Todo[], string>({
    loader: () => {
    return this.todoService.getItems();
  },
    });

// Undo and redo stack
  canUndo = this.#store.canUndo; // use in template or in ts
  canRedo = this.#store.canRedo; // use in template or in ts
  clearUndoRedoStack = this.#store.clearStack; // use in template or in ts

  undo(): void {
    if (!this.canUndo()) return;
    this.#store.undo();
  }

  redo(): void {
    if (!this.canRedo()) return;
    this.#store.redo();
  }

  clearStack(): void {
    this.#store.clearStack();
  }

   // Selection
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.#store.selection().selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
 /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
      if (this.isAllSelected()) {
         this.#store.selection().clear();
      } else {
         this.dataSource.data.forEach(row => this.#store.selection().select(row));
      }
      // Update
      this.dataSource.data.forEach(row => this.#store.toggleSelected(row.id));
}

  checkboxLabel(row: ItemInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.#store.selection().isSelected(row) ? 'deselect' : 'select'}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateButton( id: string, mode: string ) {
    this.#store.todoIdSelectedId(id);
    this.#store.initNavButton(id);
    this.router.navigate([this.routeToDetail, id, mode]);
  }

  addOne() {
    this.router.navigate([this.routeToDetail, '', 'create']);
  }

// Delete the selected item
  async remove( id: string ) {

  }

  virtualRemove(id: string) {

  }
// MatTable mgt
// On click row action
  onRowClicked(row: number) {
    console.log('Row clicked: ', row);
  }

}
