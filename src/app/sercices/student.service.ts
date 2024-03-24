// student.service.ts
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject, of } from 'rxjs';
import { Student } from './../model/student.model';
import { switchMap } from 'rxjs/operators';
import { initialStudentsData } from '../data/students'
import moment from 'moment'; // Import Moment.js


const studentsData: Student[] = initialStudentsData;
const dateString = "Tue Feb 11 2025 00:00:00 GMT+0000 (heure moyenne de Greenwich)";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const month = monthNames.indexOf(dateString.substring(4, 7)) + 1; // Mois (1-12)
const day = parseInt(dateString.substring(8, 10)); // Jour (1-31)
const year = parseInt(dateString.substring(11, 15)); // Année (ex: 2025)

@Injectable({
  providedIn: 'root'
})
export class StudentService {
    private students: Student[] = initialStudentsData;
    private _refreshrequired = new Subject<void>();
    get RequiredRefresh() {
      return this._refreshrequired;
    }
  constructor() {}

  getStudents(): Observable<Student[]> {
    return of(studentsData);
  }
  addStudent(student: Student): Observable<Student> {
    return new Observable<Student>(subscriber => {
      const existingStudent = studentsData.find(s => s.id === student.id);
      if (existingStudent) {
        subscriber.error(new Error('Duplicate student ID'));
        return;
      }
      const maxId = studentsData.reduce((max, s) => (s.id > max ? s.id : max), 0);
      student.id = maxId + 1;
      student.datenasissance = moment(student.datenasissance, true).format('MM/DD/YYYY');
      studentsData.push(student);
      subscriber.next(student);
      subscriber.complete();
      this.RequiredRefresh.next()
    });
  }
  editStudent(student: Student): Observable<Student> {
    return new Observable<Student>(subscriber => {
      const existingStudentIndex = this.students.findIndex(s => s.id === student.id);

      if (existingStudentIndex === -1) {
        subscriber.error(new Error('Student not found'));
        return;
      }
      this.students[existingStudentIndex] = student;
      subscriber.next(student);
      subscriber.complete();
      this.RequiredRefresh.next()
    });
  }
  getStudentById(studentId: number): Observable<Student | undefined> {
    return new Observable<Student | undefined>(subscriber => {
      const foundStudent = this.students.find(s => s.id === studentId);

      if (foundStudent) {
        subscriber.next(foundStudent);
      } else {
        subscriber.next(undefined);
      }

      subscriber.complete();
    });
  }


  deleteStudent(studentId: number): Observable<any> {
    return new Observable(subscriber => {
      const studentIndex = this.students.findIndex(s => s.id === studentId);

      if (studentIndex === -1) {
        subscriber.error(new Error('Student not found'));
        return;
      }
      this.students.splice(studentIndex, 1);
      subscriber.next({ message: 'Student deleted successfully' });
      subscriber.complete();
      this.RequiredRefresh.next();
    });
  }

}
