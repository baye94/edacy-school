import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { StudentComponent } from './student/student.component';

export const routes: Routes = [
{path: '' , redirectTo: '/student', pathMatch:'full'},
{path: 'classe' ,  component: ClassroomComponent},
{path: 'student' ,  component: StudentComponent},

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
