import { Injectable } from '@angular/core';

//Required firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

//Required Task models
import { Task } from '../models/task';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  TaskList: AngularFireList<any>;

  //Cuando seleccionen una task
  selectedTask: Task = new Task();

  constructor(private firebase: AngularFireDatabase) { }

  //Obtener todas las tareas desde firebase
  getTask(){
    //Obtener los elementos de fire
    //Guardandolo en la collecion `tasks`
    return this.TaskList = this.firebase.list('tasks')
  }

  //Insertar tareas en firebase
  insertTask(task: Task){
    this.TaskList.push({
      title: task.title,
      description: task.description,
      priority: task.priority
    });
  }

  //Actualizar task 
  updateTask(task: Task){
    this.TaskList.update(task.$key, {
      title: task.title,
      description: task.description,
      priority: task.priority
    });
  }

  //Eliminar task
  deleteTask($key: string){
    this.TaskList.remove($key)
  }
}
