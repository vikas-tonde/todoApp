import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from'@angular/common/http'

import { Observable,retry, catchError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TddataService {
  private todos = [
    { task: 'Task 1', status: false },
    { task: 'Task 2', status: true },
    { task: 'Task 3', status: false },
    { task: 'Task 4', status: false },
  ];
  url:string="http://localhost:3000/todolist";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
    }),
  }
  err_msg:any
  constructor(private http:HttpClient) {}

  getAllTodos() {
    return this.http.get(this.url)
    .pipe(retry(1), catchError(this.err_msg));
  }
  addNewTask(newTask:any):Observable<any>{
    return this.http.post<any>(
      this.url,
      JSON.stringify(newTask),
      this.httpOptions
    )
    .pipe(retry(1),catchError(this.err_msg));
  }
  
  updateTask(updatedTask:any, id:any):Observable<any>{
    return this.http
    .put<any>(
      this.url+"/"+id,
      JSON.stringify(updatedTask),
      this.httpOptions
    )
    .pipe(retry(1),catchError(this.err_msg));
  }

  deleteTask(id:number){
    return this.http.delete<any>(
      this.url+"/"+id, this.httpOptions
    )
    .pipe(retry(1),catchError(this.err_msg));
  }
}
