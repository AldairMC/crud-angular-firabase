import { Component, OnInit } from '@angular/core';

//servicio
import { TaskService } from '../../../services/task.service'

//import ngForm para el reset
import { NgForm } from '@angular/forms';

// task class
import  { Task } from '../../../models/task'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks();
    this.resetForm()
  }

  // submit del formulario
  enviarDatos(taskForm: NgForm){
    if(taskForm.value.$key == null){
      this.taskService.insertTask(taskForm.value)
    }else{
      this.taskService.updateTask(taskForm.value);
    }
    this.resetForm(taskForm); 
    
  }


  resetForm(taskForm?: NgForm){
    if(taskForm != null){
      taskForm.reset();
      this.taskService.selectedTask = new Task()
    }
  }
}
