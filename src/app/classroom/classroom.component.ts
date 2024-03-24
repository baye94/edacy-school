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
import Swal from 'sweetalert2';

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
  this.classroomService.RequiredRefresh.subscribe(() => {
    this.getClassrooms();
      });
}
preparedEdite( classroomEdit: Student){
  localStorage.setItem('my-classroom', JSON.stringify(classroomEdit));
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
  this.classroomService.getClassrooms().subscribe(
    classroom => {
      this.classrooms = classroom.reverse();
      this.dataSource = new MatTableDataSource<Classroom>(classroom.reverse());
    },
    error => {
      console.error('Erreur lors du chargement des étudiants :', error);
    }
  );
}
editClassroom(classroom: Classroom) {
  this.classroomService.editClassroom(classroom).subscribe(
     editedClassroom => {
       const studentIndex = this.classrooms.findIndex(s => s.id === editedClassroom.id);
       this.classrooms[studentIndex] = editedClassroom;
     },
     error => {
     }
   );
 }
 deleteClassroom(classroomId: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.classroomService.deleteClassroom(classroomId).subscribe({
        next: () => {
          this.classrooms = this.classrooms.filter(s => s.id !== classroomId);
          Swal.fire({
            title: 'Deleted!',
            text: 'Classroom has been deleted.',
            icon: 'success'
          });
        },
        error: (error) => {
         this.alertError()
        }
      });
    }
  });
}
alertError(){
  Swal.fire({
    title: 'Oops!',
    text: 'Something went wrong while deleting the classroom.',
    icon: 'error'
  });
}

}