import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NovoCursoComponent } from './NovoCurso/NovoCurso.component';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/models/Curso';
import { CursoService } from 'src/app/services/curso.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  modalRef?: BsModalRef;
  cursos: any;
  cursosFiltrados: any;
  displayedColumns: string[] = ['cursoNome', 'descricao', 'categoria', 'dataInicio', 'dataTermino', 'qtdAlunos', 'user', 'action']
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cursoService: CursoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllCursos()

    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2);
  }

  getAllCursos() {
    // this.spinner.show();
    this.cursoService.getAll().subscribe(
      (response: any) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.toastr.info('Cursos carregados', 'Sucesso')

      },
      (error) => {
        console.log(error);
        this.toastr.error('Erro ao carregar cursos', 'Erro');
      }
    )
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }

  openDialog() {
    this.dialog.open(NovoCursoComponent, {
      width: '50%'
    }).afterClosed().subscribe(val => {
      if (val === 'Criar') {
        this.getAllCursos();
      }
    });
  }

  editarCurso(row: any) {
    this.dialog.open(NovoCursoComponent, {
      width: '50%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'Atualizar') {
        this.getAllCursos();
      }
    });

  }

  // updateCurso() {
  //   this.cursoService.put(this.form.value, this.editData.cursoId)
  //   .subscribe(
  //     () => {
  //       this.toastr.success('Curso atualizado', 'Sucesso');
  //       this.form.reset();
  //       this.dialogRef.close('Atualizar');
  //     },
  //     (error) => {
  //       this.toastr.error(error.error);
  //       console.error(error);
  //     }
  //   ).add(() => this.spinner.hide());
  // }

  excluirCurso(id: number) {
    this.spinner.show();
    this.cursoService.delete(id)
      .subscribe(
        () => {
          this.toastr.success('Curso excluído', 'Sucesso');
          this.getAllCursos();
        },
        (error) => {
          this.toastr.error(error.error);
          console.error(error);
        }
      ).add(() => this.spinner.hide());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }





}
