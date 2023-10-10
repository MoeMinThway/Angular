import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {

  list:any[]
  constructor(private service:StudentService){
    this.list=service.getAll()
  }
  delete(student:any){
    this.list= this.service.delete(student)
  }
}
