import { PerfilComponent } from './components/user/perfil/perfil.component';
import { Curso_listaComponent } from './components/cursos/curso_lista/curso_lista.component';
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
      { path: 'user', redirectTo: 'user/perfil' },
      {
        path: 'user/perfil',
        component: PerfilComponent,
      },
      { path: 'cursos', redirectTo: 'cursos/lista' },
      {
        path: 'cursos',
        component: CursosComponent,
        children: [
          // { path: 'post/:id', component: PostDetalheComponent },
          // { path: 'detalhe', component: PostDetalheComponent },
          { path: 'lista', component: Curso_listaComponent }
        ],
      },
      // { path: 'dashboard', component: DashboardComponent },
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
