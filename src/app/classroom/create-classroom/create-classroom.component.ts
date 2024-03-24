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

@Component({
  selector: 'app-create-classroom',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [NgFor ,MatDividerModule,MatDatepickerModule,MatGridListModule,MatDialogModule,MatFormFieldModule,MatIconModule,MatButtonModule,MatInputModule,MatCardModule,MatSelectModule,FormsModule],
  templateUrl: './create-classroom.component.html',
  styleUrl: './create-classroom.component.css'
})
export class CreateClassroomComponent {
  @ViewChild('modal') modal: any;
  constructor(private classroomService: ClassroomService, private dialogData: MatDialog,private snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {
   this.getClassroom();
  }
  newClassroom: any = {};
  classrooms : Classroom [] = [];
  onSubmit() {
    console.log('onSubmit() called');
    this.classroomService.addClassroom(this.newClassroom).subscribe({
      next: () => {
        console.log('Student added successfully');
        console.log(this.newClassroom);
          this.snackBar.open('Enregistrement effectué avec succès !', 'Fermer', {
     duration: 2000,
    });
        this.newClassroom = {};
        this.dialogData.closeAll();
      },
      error: (error) => {
        console.error('Error while adding student:', error);
      }
    });
  }
  onCancel(): void {
    this.dialogData.closeAll(); // Fermez tous les modals
    // Action pour annuler l'ajout de l'étudiant (si nécessaire)
  }
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
}
