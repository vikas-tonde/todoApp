import { Component, Input, OnInit } from '@angular/core';
import { TddataService } from '../shared/tddata.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tdlist',
  templateUrl: './tdlist.component.html',
  styleUrls: ['./tdlist.component.css'],
})
export class TdlistComponent implements OnInit {
  todos: any [];
  currentTodo: any;
  task: any;
  showUpdateButtond: boolean = false;
  constructor(private tddata: TddataService) {
    this.loadTodos();
    this.task = '';
  }
  loadTodos() {
    this.tddata.getAllTodos().subscribe((data: any) => {
      console.log(data);
      this.todos = data;
    });
  }
  addTodo() {
    this.currentTodo = { id: Date.now(), task: this.task, status: false };
    this.task = '';
    this.createTask(this.currentTodo);
  }
  createTask(newTask: any) {
    this.tddata.addNewTask(newTask).subscribe((data: any) => {
      this.loadTodos();
    });
  }
  deleteTodo(id: any) {
    this.tddata.deleteTask(id).subscribe(data=>{
      this.loadTodos();
    })
  }
  markAsCompleted(index: any, t: any) {
    console.log(index)
    t.status = true;
    this.tddata.updateTask(t, t._id).subscribe((data: any) => {
      this.loadTodos();
      this.showUpdateButtond = false;
    });
  }
  editTodo(id: any, t: any) {
    this.task = t.task;
    this.showUpdateButtond = true;
    this.currentTodo = t;
  }
  updateTodo() {
    this.currentTodo.task = this.task;
    this.tddata
      .updateTask(this.currentTodo, this.currentTodo._id)
      .subscribe((data: any) => {
        this.loadTodos();
        this.task = '';
        this.showUpdateButtond = false;
      });
  }
  ngOnInit(): void {}
}
