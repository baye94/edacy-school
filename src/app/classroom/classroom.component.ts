import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from '../student/create-student/modal.component';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { Student } from '../model/student.model';
import { StudentService } from '../sercices/student.service';
import { Classroom } from '../model/classroom.model';
import { ClassroomService } from "../sercices/classroom.service";
import { EditStudentComponent } from '../student/edit-student/edit-student.component';
import { CreateClassroomComponent } from './create-classroom/create-classroom.component';
import { EditClassroomComponent } from './edit-classroom/edit-classroom.component';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports:  [MatDialogModule,MatTableModule,MatPaginatorModule,MatIconModule,MatDividerModule,MatButtonModule, MatCardModule,MatGridListModule],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css'
})
export class ClassroomComponent {
  students: Student[]= [];
  classrooms : Classroom [] = [];
  displayedColumns: string[] = ['id', 'code', 'libelle','actions'];
dataSource : any;
constructor(public dialog: MatDialog, public studentService:StudentService , public classroomService: ClassroomService) {
  this.paginator = {} as MatPaginator;

}
@ViewChild(MatPaginator) paginator: MatPaginator;

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}
ngOnInit() {
  this.getClassrooms();
}
preparedEdite( studentEdit: Student){
  localStorage.setItem('my-student', JSON.stringify(studentEdit));
  this.openEditDialog('0ms','0ms');
}
openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(EditClassroomComponent, {
    width: '800px',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}
openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(CreateClassroomComponent, {
    width: '800px',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}
getClassrooms() {
  this.studentService.getStudents().subscribe(
    students => {
      this.students = students.reverse();
      this.dataSource = new MatTableDataSource<Student>(students.reverse());
    },
    error => {
      console.error('Erreur lors du chargement des étudiants :', error);
    }
  );
}
editStudent(student: Student) {
  this.studentService.editStudent(student).subscribe(
     editedStudent => {
       const studentIndex = this.students.findIndex(s => s.id === editedStudent.id);
       this.students[studentIndex] = editedStudent;
     },
     error => {
     }
   );
 }
 deleteStudent(studentId: number) {
  this.studentService.deleteStudent(studentId).subscribe(
     response => {
       this.students = this.students.filter(s => s.id !== studentId);
     },
     error => {
       // Gérer l'erreur de suppression
     }
   );
 }
}
