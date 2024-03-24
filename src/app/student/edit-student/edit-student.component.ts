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
    console.log('onSubmit() called');
    this.studentService.editStudent(this.newStudent).subscribe({
      next: () => {
        console.log('Student added successfully');
        console.log(this.studentService.getStudents())
          this.snackBar.open('Enregistrement effectué avec succès !', 'Fermer', {
     duration: 2000,
    });
        this.newStudent = {};
        this.dialogData.closeAll();
      },
      error: (error) => {
        console.error('Error while adding student:', error);
      }
    });
  }
  newDate(date: string): Date | null {
    try {
      return new Date(date);
    } catch (error) {
      console.error('Error parsing date string:', error);
      return null; // Or throw an error if appropriate
    }
  }
  onCancel(): void {
    this.dialogData.closeAll(); // Fermez tous les modals
    // Action pour annuler l'ajout de l'étudiant (si nécessaire)
  }
}
