// student.service.ts
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { Student } from './../model/student.model';
import { switchMap } from 'rxjs/operators';
import { initialClassroomsData } from '../data/classroom'
import moment from 'moment'; // Import Moment.js
import { Classroom } from '../model/classroom.model';


const classroomsData: Classroom[] = initialClassroomsData;
const dateString = "Tue Feb 11 2025 00:00:00 GMT+0000 (heure moyenne de Greenwich)";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const month = monthNames.indexOf(dateString.substring(4, 7)) + 1; // Mois (1-12)
const day = parseInt(dateString.substring(8, 10)); // Jour (1-31)
const year = parseInt(dateString.substring(11, 15)); // Année (ex: 2025)

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
    private classrooms: Classroom[] = initialClassroomsData;

  private apiUrl = '../data/students.json';

  constructor() {}

  getClassrooms(): Observable<Classroom[]> {
    return of(classroomsData);
  }
  addClassroom(classroom: Classroom): Observable<Classroom> {
    return new Observable<Classroom>(subscriber => {
      const existingStudent = classroomsData.find(s => s.id === classroom.id);
      if (existingStudent) {
        subscriber.error(new Error('Duplicate student ID'));
        return;
      }
      const maxId = classroomsData.reduce((max, s) => (s.id > max ? s.id : max), 0);
      classroom.id = maxId + 1;
      classroomsData.push(classroom);
      subscriber.next(classroom);
      subscriber.complete();
    });
  }
  editClassroom(classroom: Classroom): Observable<Classroom> {
    return new Observable<Classroom>(subscriber => {
      const existingStudentIndex = this.classrooms.findIndex(s => s.id === classroom.id);

      if (existingStudentIndex === -1) {
        subscriber.error(new Error('Student not found'));
        return;
      }
      this.classrooms[existingStudentIndex] = classroom;
      subscriber.next(classroom);
      subscriber.complete();
    });
  }
  getClassroomById(studentId: number): Observable<Classroom | undefined> {
    return new Observable<Classroom | undefined>(subscriber => {
      const foundStudent = this.classrooms.find(s => s.id === studentId);

      if (foundStudent) {
        subscriber.next(foundStudent);
      } else {
        subscriber.next(undefined);
      }

      subscriber.complete();
    });
  }


  deleteClassroom(classroomId: number): Observable<any> {
    return new Observable(subscriber => {
      const studentIndex = this.classrooms.findIndex(s => s.id === classroomId);

      if (studentIndex === -1) {
        subscriber.error(new Error('Student not found'));
        return;
      }

      const confirmation = window.confirm('Are you sure you want to delete this student?');
      if (!confirmation) {
        subscriber.next({ message: 'Deletion canceled' });
        subscriber.complete();
        return;
      }

      this.classrooms.splice(studentIndex, 1);
      subscriber.next({ message: 'Student deleted successfully' });
      subscriber.complete();
    });
  }

}
