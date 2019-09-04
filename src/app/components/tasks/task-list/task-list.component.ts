import { Component, OnInit } from '@angular/core';

//service
import { TaskService } from '../../../services/task.service'

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
    private taskService: TaskService
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

}
