
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import { StudentService } from '../../sercices/student.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import { Classroom } from '../../model/classroom.model';
import { ClassroomService } from "../../sercices/classroom.service";
import { NgFor } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-classroom',
  standalone: true,
  imports: [NgFor ,MatDividerModule,MatDatepickerModule,MatGridListModule,MatDialogModule,MatFormFieldModule,MatIconModule,MatButtonModule,MatInputModule,MatCardModule,MatSelectModule,FormsModule],
  templateUrl: './edit-classroom.component.html',
  styleUrl: './edit-classroom.component.css'
})
export class EditClassroomComponent implements OnInit {
  @ViewChild('modal') modal: any;
  storedClassroomString:any;
  classroomObject:any;
  newClassroom: any = {};
  constructor(private classroomService: ClassroomService, private dialogData: MatDialog,private snackBar: MatSnackBar,
    ) {}
  ngOnInit(): void {
    this.storedClassroomString = localStorage.getItem('my-classroom');
    this.classroomObject = JSON.parse(this.storedClassroomString);
    console.log(this.classroomObject);
    this.newClassroom = this.classroomObject;
  }
  onCancel(): void {
    this.dialogData.closeAll();
  }
  classrooms : Classroom [] = [];
  onSubmit() {
    this.classroomService.editClassroom(this.newClassroom).subscribe({
      next: () => {
        this.newClassroom = {};
        this.dialogData.closeAll();
        this.showAlert();
      },
      error: () => {
        this.alertError()
      }
    });
  }
  showAlert() {
    Swal.fire({
      title: "Classroom update with success!",
      text: "You clicked the button!",
      icon: "success"
    });
  }
  alertError(){
    Swal.fire({
      title: 'Oops!',
      text: 'Something went wrong while updating the classroom.',
      icon: 'error'
    });
  }
}
