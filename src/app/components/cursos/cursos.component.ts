import { MatDialog } from '@angular/material/dialog';
import { NovoCursoComponent } from './NovoCurso/NovoCurso.component';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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

  modalRef?: BsModalRef;
  cursos: any;
  cursosFiltrados: any;

  constructor(private cursoService: CursoService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              public dialog: MatDialog) { }

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

  openDialog() {
    const dialogRef = this.dialog.open(NovoCursoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  



}
