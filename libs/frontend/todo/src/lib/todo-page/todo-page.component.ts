import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MATERIAL } from '@fe/material'; // Ensure MATERIAL is an array of NgModules
// import { DirtyComponent } from '@fe/utilities';
import { CommonModule } from '@angular/common';
import { ItemInterface } from '../store/todo.model';
import { TodoStore } from '../store/todo.store';

// Typed forms based on:  https://offering.solutions/blog/articles/2022/07/09/getting-started-with-angular-strictly-typed-reactive-forms/

export type TodoForm = FormGroup<{
  id: FormControl<string | null>;
  title: FormControl<string | null>;
  content: FormControl<string | null >;
  todoState: FormControl<string | null>;
  orderTodo: FormControl<number | null>;
}>

@Component({
  selector: 'lib-todo-page',
  imports: [
    CommonModule,
    ...MATERIAL,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss',
})
export class TodoPageComponent implements OnInit {
    private formBuilder = inject(FormBuilder);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private dateAdapter = inject<DateAdapter<Date>>(DateAdapter);


    readonly itemStore = inject(TodoStore);

    public item: Partial<ItemInterface> | undefined | null;

    formGroup: FormGroup;

    itemId!: string | undefined // | null;
    itemItem: ItemInterface | undefined;
    itemItems: ItemInterface[] | undefined;

    submitted = false;
    mode: 'create' | 'update' | 'view' | undefined;
    isAdmin = false
    formControlsInit = {
      id: ['', []],
      title: ['', []],
      content: ['', []],
      todoState: ['', []],
      orderTodo: [0, []],
      numSeq: [0, []]
    };

    constructor(  // private alertService: AlertService,
    ) {
      this.itemId = this.route.snapshot.params['id'];
      this.mode = this.route.snapshot.params['mode'];
      // this.form = this.fb.group(this.formControls);

      if((this.itemId === undefined )|| (this.itemId === null)){
        this.itemId = this.itemStore.items().at(0)?.id;
      }
      if(this.mode === undefined || this.mode === null) {
        this.mode = 'view';
      }

      this.formGroup = this.formBuilder.group(this.formControlsInit);
    }

    fetchData(): void {
      // this.itemItems = this.itemStore.todoEntities();
      this.itemItems = this.itemStore.items();
    }

    ngOnInit(): void {
      // this.formGroup = this.formBuilder.group(this.formControlsInit);
      this.reload(this.itemId!);
    }


    reload(id: string | undefined | null) {
      if (id === undefined || id === null) {
        id = this.itemStore.selectedId()!
      }
      if (this.mode === 'update' || this.mode === 'view') {
        this.itemStore.itemIdSelectedId(id);
        this.formGroup.patchValue({
          id: this.itemStore.selectedItem()?.id,
          title: this.itemStore.selectedItem()?.title,
          content: this.itemStore.selectedItem()?.content,
          todoState: this.itemStore.selectedItem()?.todoState,
          orderTodo: this.itemStore.selectedItem()?.orderTodo,
          numSeq: this.itemStore.selectedItem()?.numSeq
        });
      } else if (this.mode == 'create') {
        this.formGroup = this.formBuilder.group({
          ...this.formControlsInit,
        });
      }
    }

    onSubmit() {
      const formValue = this.formGroup.value;
      console.log(formValue);
    }

    save() {
      const val = this.formGroup.value;
      if (this.mode == 'update') {

        // todo

      } else if (this.mode == 'create') {

        // todo

      }
      this.router.navigate(['todos']);
    }

    add() { }

    create() { }

    cancel() { }

    remove() { }

    reset() { }

    virtualRemove() { }


    next() {
      this.itemStore.next();
      this.itemStore.newSelectedItem(this.itemStore.currentPosition());
      this.itemId = this.itemStore.selectedId()!;
      this.reload(this.itemStore.selectedId()!);
    }

    last() {
      this.itemStore.last();
      this.itemStore.newSelectedItem(this.itemStore.currentPosition());
      this.itemId = this.itemStore.selectedId()!;
      this.reload(this.itemStore.selectedId()!);
    }

    first() {
      this.itemStore.first();
      this.itemStore.newSelectedItem(this.itemStore.currentPosition());
      this.itemId = this.itemStore.selectedId()!;
      this.reload(this.itemStore.selectedId()!);
    }

    previous() {
      this.itemStore.previous();
      this.itemStore.newSelectedItem(this.itemStore.currentPosition());
      this.itemId = this.itemStore.selectedId()!;
      this.reload(this.itemStore.selectedId()!);
    }

    onReset() {
      this.submitted = false;
      this.formGroup.reset();
    }

    backHome() {
      this.router.navigate(['home']);
    }


    isDirty(): boolean {
      // Here you have to define what "dirty" means for your application.
      return this.formGroup.dirty;
    }





}
