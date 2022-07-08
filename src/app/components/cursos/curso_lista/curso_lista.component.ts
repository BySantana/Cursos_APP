import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CursoService } from './../../../services/curso.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/Curso';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-curso_lista',
  templateUrl: './curso_lista.component.html',
  styleUrls: ['./curso_lista.component.css']
})
export class Curso_listaComponent implements OnInit {

  cursos: Curso[];
  cursosFiltrados: Curso[];

  constructor(private cursoService: CursoService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  getAllCursos(){
    this.spinner.show();
    this.cursoService.getAll().subscribe(
      (response: Curso[]) => { 
        this.cursos = response;
        this.cursosFiltrados = this.cursos;
        this.toastr.info('Cursos carregados', 'Sucesso')  
      },
      (error) => { 
        console.log(error);
        this.toastr.error('Erro ao carregar cursos', 'Erro');
      }
    ).add(() => this.spinner.hide());
  }
}
