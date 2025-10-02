import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT_TOKEN } from '@fe/shared';

import { Observable, catchError, firstValueFrom, lastValueFrom, throwError } from 'rxjs';
import { ItemInterface, ItemPartialInterface } from '../store/todo.model';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
    // Authorization: 'my-auth-token'
	})
};

export type TodoFilter = {
  ownerId: string;
  orgId: string;
}



@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // export class TodoService implements DataService<ItemInterface, TodoFilter> {
  private readonly http = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT_TOKEN);

  // private apiUrl = `api`;
  private apiUrl = this.environment.API_BACKEND_PREFIX;
  private baseUrl = `${this.apiUrl}`;

  async getAllItems(): Promise<ItemInterface[]> {

    const response = await fetch(`${this.baseUrl}/alltodos`, {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
    }});

    if (!response.ok) throw new Error("Unable to load todos!");
    const todos = await response.json();

    return todos;

  }

  load(): Promise<ItemInterface[]> {
    return this.findAsPromise();
  }

  private findAsPromise(): Promise<ItemInterface[]> {
    return firstValueFrom(this.find());
  }

  private find(): Observable<ItemInterface[]> {
    const url = [this.baseUrl, 'todos'].join('/');
    const ownerId = "";
    const orgId = "";
    // const params = new HttpParams()
    const params = new HttpParams().set('ownerId', ownerId).set('orgId', orgId);
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<ItemInterface[]>(url, { params, headers });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle it accordingly
      console.error('An error occured:', error.error.message);
    } else {
      // The backend returned an unsuccessful respone code.
      // The response body may contain clues as to what was wrong
      console.log(
        `Backend returned code ${error.status}, body was: ${error.status}`
      );
    }
    // return an observable wuth a user-facing error message
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  // getItemsAsPromise(): Promise<ItemInterface[]>{
  //   return lastValueFrom(this.getItems());
  // }

  // getItems(): Observable<ItemInterface[]> {
  //   return this.http
  //     .get<ItemInterface[]>(`${this.baseUrl}/todos`, httpOptions)
  //     .pipe(
  //       catchError(this.handleError));;
  // }

  // getItem(id: string) {
  //   return this.http.get<ItemInterface>(`${this.baseUrl}/todo/${id}`);
  // }

  // addItem(value: string) {
  //   return this.http.todo<ItemInterface>(this.baseUrl, { value });
  // }

  // updateItem(value: ItemInterface) {
  //   return this.http.put<ItemInterface>(`${this.baseUrl}/${value?.id}`, value);
  // }

  // deleteItem(value: ItemInterface ) {
  //   return this.http.delete(`${this.baseUrl}/${value?.id}`);
  // }

  async getItems(): Promise<ItemInterface[]>{
    const response = await fetch(`${this.baseUrl}/alltodos`, {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
    }});

    if (!response.ok) throw new Error("Unable to load todos!");
    const todos = await response.json();

    return todos;
  }

  getItem(id: string): Promise<ItemInterface> {
    const item = lastValueFrom(this.http
      .get<ItemInterface>(`${this.baseUrl}/todo/${id}`)
      .pipe(
        catchError(this.handleError)));
    return item;
  }

  addItem(values: {
    content: string | null | undefined;
    title: string| null | undefined;
    ownerId: string;
    orgId: string
    }){
    const itemCreated = lastValueFrom(this.http
      .post<ItemInterface>(`${this.baseUrl}/createTodo`, values )
      .pipe(
        catchError(this.handleError)));
    return itemCreated
  }

  updateItem(data: ItemPartialInterface) {
    const itemUpdated: Promise<ItemPartialInterface> = lastValueFrom(this.http
      .put<ItemPartialInterface>(`${this.baseUrl}/updateTodo/${data?.id}`, data)
      .pipe(
        catchError(this.handleError)));
    return itemUpdated
  }

  deleteItem(id: string ) {
    const deletedItem = lastValueFrom(this.http
      .delete(`${this.baseUrl}/deletetodo/${id}`)
      .pipe(
        catchError(this.handleError)));
    return deletedItem
  }
}
