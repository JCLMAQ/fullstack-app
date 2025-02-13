
import { Injectable } from "@angular/core";



@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private baseUrl = 'api';

  async getAllTasks() {
    // async getAllTasks(): Promise<ItemInterface[]> {

    const response = await fetch(`${this.baseUrl}/alltasks`, {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
    }});

    if (!response.ok) throw new Error("Unable to load tasks!");
    const tasks = await response.json();
    // const tasks: ItemInterface[] = await response.json();

    return tasks;

  }


    // findPromise(filter: DessertFilter, abortSignal?: AbortSignal): Promise<Dessert[]> {
    //   return toPromise(this.find(filter), abortSignal);
    // }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occured. Handle it accordingly
  //     console.error('An error occured:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful respone code.
  //     // The response body may contain clues as to what was wrong
  //     console.log(
  //       `Backend returned code ${error.status}, body was: ${error.status}`
  //     );
  //   }
  //   // return an observable wuth a user-facing error message
  //   return throwError(() => new Error('Something bad happened; please try again later.'));
  // }

  // getTasks(): Observable<TaskInterface[]> {
  //     return this.http
  //       .get<TaskInterface[]>(this.baseUrl, httpOptions)
  //    .pipe(

  //     catchError(this.handleError)
  //    )
  // }

// To be tested

  // getAllTaskItems(): Observable<TaskInterface[]> {
  //   return this.http
  //     .get<TaskInterface[]>(this.baseUrl, httpOptions)
  //     .pipe(
  //       map((results: any) => results.tasks),
  //       catchError(this.handleError));
  // }

  // getTaskById(taskId: string): Observable<TaskInterface> {
  //   const url = `${this.baseUrl}/${taskId}`;
  //   return this.http
  //   .get<TaskInterface>(url, httpOptions)
  //   .pipe(catchError(this.handleError));
  // }

  // createTask(userData: TaskInterface): Observable<TaskInterface> {
  //   return this.http
  //     .post<TaskInterface>(this.baseUrl, userData, httpOptions)
  //     .pipe(catchError(this.handleError));
  // }

  // updateTask(taskId: string, taskData: TaskInterface): Observable<TaskInterface> {
  //   const url = `${this.baseUrl}/${taskId}`;
  //   return this.http
  //     .patch<TaskInterface>(url, taskData, httpOptions)
  //     .pipe(catchError(this.handleError));
  // }

  // createOrUpdateTask(taskId: string, taskData: TaskInterface): Observable<TaskInterface> {
  //   const url = `${this.baseUrl}/${taskId}`;
  //   return this.http
  //     .put<TaskInterface>(url, taskData, httpOptions)
  //     .pipe(catchError(this.handleError));
  // }

  // deleteTask(taskId: string): Observable<never> {
  //   const url = `${this.baseUrl}/${taskId}`; // DELETE api/tasks/42-5c-...
  //   return this.http
  //     .delete<never>(url, httpOptions)
  //     .pipe(catchError(this.handleError));
  // }
}

