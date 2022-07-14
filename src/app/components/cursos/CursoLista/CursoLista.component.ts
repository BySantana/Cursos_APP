import { ExcluirCursoComponent } from './../ExcluirCurso/ExcluirCurso.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { CursoService } from 'src/app/services/curso.service';
import { NovoCursoComponent } from '../NovoCurso/NovoCurso.component';

@Component({
  selector: 'app-CursoLista',
  templateUrl: './CursoLista.component.html',
  styleUrls: ['./CursoLista.component.css']
})
export class CursoListaComponent implements OnInit {

  modalRef?: BsModalRef;
  displayedColumns: string[] = ['descricao', 'categoria', 'dataInicio', 'dataTermino', 'qtdAlunos', 'user', 'action']
  dataSource: MatTableDataSource<any>;
  user: string;

  dataInicio: string = null;
  dataTermino: string = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cursoService: CursoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private accountService: AccountService) { }

  ngOnInit() {
    this.getAllCursos()
    this.nomeUser();
  }

  getAllCursos() {
    this.spinner.show();
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
    ).add(() => this.spinner.hide())
    
  }

  limpar() {
    this.dataInicio = null;
    this.dataTermino = null;
    this.getAllCursos();
  }

  openDialog() {
    this.dialog.open(NovoCursoComponent, {
      width: '25%'
    }).afterClosed().subscribe(val => {
      if (val === 'Criar') {
        this.getAllCursos();
      }
    });
  }

  editarCurso(row: any) {
    this.dialog.open(NovoCursoComponent, {
      width: '25%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'Atualizar') {
        this.getAllCursos();
      }
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllCursosByDatas() {
    this.spinner.show();
    this.cursoService.getAllByDatas(this.dataInicio, this.dataTermino).subscribe(
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
    ).add(() => this.spinner.hide())
    
  }

  getAllCursosByData(data: string) {
    this.spinner.show();
    this.cursoService.getAllByData(data).subscribe(
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
    ).add(() => this.spinner.hide())
  }

  filtrarByDate() {
    if (this.dataInicio == null && this.dataTermino == null) {
      this.toastr.error('Selecione uma data', 'Erro')
    }
    else {
      if (this.dataInicio != null && this.dataTermino != null) {
        this.getAllCursosByDatas();
      }
      else if (this.dataInicio != null && this.dataTermino == null) {
        this.getAllCursosByData(this.dataInicio);
      } else if (this.dataInicio == null && this.dataTermino != null) {
        this.getAllCursosByData(this.dataTermino);
      }
    }
  }

  nomeUser(){
    this.accountService.getUser().subscribe(
      (response) => { this.user = response.userName }
    )
  }

  dialogoExcluir(row: any): void {
    this.dialog.open(ExcluirCursoComponent, {
      width: '25%',
      data: row
    }).afterClosed().subscribe(val => {

        this.getAllCursos();

    });
  }

}
