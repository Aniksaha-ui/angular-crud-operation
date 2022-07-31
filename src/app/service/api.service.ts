import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTodo() {
    return this.http.get<any>('http://localhost:4000/todo');
  }

  postTodo(data) {
    return this.http.post<any>('http://localhost:4000/todo', data);
  }

  //update todo
  putTodo(data: any, id: any) {
    return this.http.put<any>('http://localhost:4000/todo/' + id, data);
  }
}
