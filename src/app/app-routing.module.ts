import { ExcluirCursoComponent } from './components/cursos/ExcluirCurso/ExcluirCurso.component';
import { CursoListaComponent } from './components/cursos/CursoLista/CursoLista.component';
import { LogsComponent } from './components/Logs/Logs.component';

import { NovoCursoComponent } from './components/cursos/NovoCurso/NovoCurso.component';

import { CursosComponent } from './components/cursos/cursos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'cursos', redirectTo: 'cursos/lista' },
      {
        path: 'cursos',
        component: CursosComponent,
        children: [
          { path: 'lista', component: CursoListaComponent },
          { path: 'novoCurso', component: NovoCursoComponent },
          { path: 'excluirCurso', component: ExcluirCursoComponent }
        ],
      },
      { path: 'logs', component: LogsComponent },
    ],
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ],
  },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
