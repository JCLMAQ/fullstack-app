import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, effect, inject, Resource, resource, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { Todo } from '@prisma/client';
import { TodoService } from '../services/todo.service';
import { ItemInterface } from '../store/todo.model';
import { TodoStore } from '../store/todo.store';

@Component({
  selector: 'lib-todo-list',
  imports: [ ...MATERIAL],
  templateUrl: './todo-list.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements AfterViewInit {
  // Router configuration
  readonly router = inject(Router)
  routeToDetail = "todos/todo";
constructor() {
  effect(()=> {
    this.fetchData();
  });
  // this.itemStore.initSelectedID();
}
  // Material table configuration
  columnsToDisplay: string[] = ['select', 'numSeq', 'orderTodo','title'];
  // columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand',  'tools'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay,  'tools'];
  expandedElement!: ItemInterface | null;

  mode: 'Edit' | 'View' | 'Update' | undefined ;
  master = false; // true : button is disable
  owner = false; // true button is disable


// Data access through store
  itemStore = inject(TodoStore);
  // test = this.itemStore.selection.selected().length
  items: Resource<ItemInterface[] | undefined> = this.itemStore.itemsResource;

  itemsTodo: ItemInterface[] | undefined;
  itemsEntities = this.itemStore.todoEntities;

  // loading = this.itemStore.loading;

  loading = this.itemStore.itemsResource.isLoading;
  statute = this.itemStore.itemsResource.status;

  hasValue = this.itemStore.itemsResource.hasValue;

  errorLoading = this.itemStore.itemsResource.error;

// Material table configuration
dataSource = new MatTableDataSource<ItemInterface>;
displayedColumns: string[] = ['select','numSeq','title'];
readonly paginator = viewChild(MatPaginator);
readonly sort = viewChild(MatSort);

fetchData(): void {
  this.itemsTodo = this.items.value();

  this.dataSource = new MatTableDataSource(this.items.value());
  this.dataSource.paginator = this.paginator()!;
  this.dataSource.sort = this.sort()!;
}

ngAfterViewInit(): void {
  this.fetchData();
}


// Data access through service / Direct access to DB
  private readonly todoService = inject(TodoService);
  todos = resource<Todo[], string>({
    loader: () => {
    return this.todoService.getItems();
  },
    });

// Undo and redo stack
  canUndo = this.itemStore.canUndo; // use in template or in ts
  canRedo = this.itemStore.canRedo; // use in template or in ts
  clearUndoRedoStack = this.itemStore.clearStack; // use in template or in ts

  undo(): void {
    if (!this.canUndo()) return;
    this.itemStore.undo();
  }

  redo(): void {
    if (!this.canRedo()) return;
    this.itemStore.redo();
  }

  clearStack(): void {
    this.itemStore.clearStack();
  }

   // Selection
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.itemStore.selection().selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
 /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
      if (this.isAllSelected()) {
        this.itemStore.selection().clear();
      } else {
        this.dataSource.data.forEach(row => this.itemStore.selection().select(row));
      }
      // Update
      this.dataSource.data.forEach(row => this.itemStore.toggleSelected(row.id));
}

  checkboxLabel(row: ItemInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.itemStore.selection().isSelected(row) ? 'deselect' : 'select'}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateButton( id: string, mode: string ) {
    this.itemStore.itemIdSelectedId(id);
    this.itemStore.initNavButton(id);
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
