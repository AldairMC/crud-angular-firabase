import { Component, OnInit } from '@angular/core';

//servicio
import { TaskService } from '../../../services/task.service'
import { ToastrService } from 'ngx-toastr'

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

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.taskService.getTasks();
    this.resetForm()
  }

  // submit del formulario
  enviarDatos(taskForm: NgForm){
    if(taskForm.value.$key == null){
      this.taskService.insertTask(taskForm.value)
      this.toastr.success("Tarea Creada!", "Operación")
    }else{
      this.taskService.updateTask(taskForm.value);
      this.toastr.success("Tarea Actualizada!", "Operación")
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
