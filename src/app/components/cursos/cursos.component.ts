import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/models/Curso';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos: any;
  cursosFiltrados: any;

  constructor(private cursoService: CursoService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllCursos()
  }

  getAllCursos(){
    this.spinner.show();
    this.cursoService.getAll().subscribe(
      (response: any) => { 
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
