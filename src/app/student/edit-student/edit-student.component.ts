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
import { Student } from '../../model/student.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [MatDividerModule,MatDatepickerModule,MatGridListModule,MatDialogModule,MatFormFieldModule,MatIconModule,MatButtonModule,MatInputModule,MatCardModule,MatSelectModule,FormsModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})

export class EditStudentComponent implements OnInit {
  @ViewChild('modal') modal: any;
  storedStudentString:any;
  studentObject:any;
  constructor(private studentService: StudentService, private dialogData: MatDialog,private snackBar: MatSnackBar,

  ) {}
  ngOnInit(): void {
    this.storedStudentString = localStorage.getItem('my-student');
    this.studentObject = JSON.parse(this.storedStudentString);
    console.log(this.studentObject);
    this.newStudent = this.studentObject;
  }

  newStudent: any = {};
  onSubmit() {
    this.studentService.editStudent(this.newStudent).subscribe({
      next: () => {
        this.newStudent = {};
        this.dialogData.closeAll();
        this.showAlert();
      },
      error: (error) => {
        this.alertError();
      }
    });
  }
  newDate(date: string): Date | null {
    try {
      return new Date(date);
    } catch (error) {
      return null; // Or throw an error if appropriate
    }
  }
  onCancel(): void {
    this.dialogData.closeAll(); // Fermez tous les modals
    // Action pour annuler l'ajout de l'étudiant (si nécessaire)
  }
  showAlert() {
    Swal.fire({
      title: "Student update with success!",
      text: "You clicked the button!",
      icon: "success"
    });
  }
  alertError(){
    Swal.fire({
      title: 'Oops!',
      text: 'Something went wrong while updating the student.',
      icon: 'error'
    });
  }
}
