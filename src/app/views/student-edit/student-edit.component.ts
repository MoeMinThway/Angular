import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent {

  studentForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private service: StudentService,
    private route: ActivatedRoute,
    private router: Router) {
    this.studentForm = fb.group({
      id: null,
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.maxLength(120)]
    }
    )
    route.params.subscribe(p => {
      if (p['id']) {
        this.studentForm.patchValue(service.findById(p['id']));
      }
    });

  }
  save() {
    this.service.save(this.studentForm.value)
    this.router.navigateByUrl('/list')
  }
}
