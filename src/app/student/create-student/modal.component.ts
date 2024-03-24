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
  selector: 'app-modal',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [NgFor ,MatDividerModule,MatDatepickerModule,MatGridListModule,MatDialogModule,MatFormFieldModule,MatIconModule,MatButtonModule,MatInputModule,MatCardModule,MatSelectModule,FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  @ViewChild('modal') modal: any;
  constructor(private studentService: StudentService, private dialogData: MatDialog,private snackBar: MatSnackBar,
    public classroomService: ClassroomService,
  ) {}
  ngOnInit(): void {
    this.getClassroom();
  }
  newStudent: any = {};
  classrooms : Classroom [] = [];
  getClassroom() {
    this.classroomService.getClassrooms().subscribe(
      classrooms => {
        this.classrooms = classrooms;
      },
      error => {
        console.error('Erreur lors du chargement des étudiants :', error);
      }
    );
  }

  onSubmit() {
    this.studentService.addStudent(this.newStudent).subscribe({
      next: () => {
        this.newStudent = {};
        this.dialogData.closeAll();
        this.showAlert()
      },
      error: (error) => {
        this.alertError()
      }
    });
  }
  onCancel(): void {
    this.dialogData.closeAll();
  }
  showAlert() {
    Swal.fire({
      title: "Student add with success!",
      text: "You clicked the button!",
      icon: "success"
    });
  }
  alertError(){
    Swal.fire({
      title: 'Oops!',
      text: 'Something went wrong while creating the student.',
      icon: 'error'
    });
  }
}
