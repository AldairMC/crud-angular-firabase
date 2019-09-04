import { Component, OnInit } from '@angular/core';

//service
import { TaskService } from '../../../services/task.service'
import { ToastrService } from 'ngx-toastr'

//models
import { Task } from '../../../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  taskList: Task[];

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    this.taskService.getTasks()
      .snapshotChanges()
      .subscribe( item => {
        this.taskList = []
        item.forEach(i => {
          let task = i.payload.toJSON()
          task["$key"] = i.key
          this.taskList.push(task as Task)
        })
      })
  }

  //Editar tarea
  editTask(task: Task){
    this.taskService.selectedTask = Object.assign({}, task);
  }

  //Eliminar tarea
  deleteTask($key: string){
    if(confirm('Esta segurade querer eliminar esta terea?')){
      this.taskService.deleteTask($key)
      this.toastr.success("Tarea eliminada!", "Operación")
    }
  }
}
