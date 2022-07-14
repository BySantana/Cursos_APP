import { ToastrService } from 'ngx-toastr';
import { CursoService } from 'src/app/services/curso.service';
import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ExcluirCurso',
  templateUrl: './ExcluirCurso.component.html',
  styleUrls: ['./ExcluirCurso.component.css']
})
export class ExcluirCursoComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,
              private cursoService: CursoService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public excluirData: any,
              private dialogRef: MatDialogRef<ExcluirCursoComponent>,) { }

  ngOnInit() {
  }

  excluirCurso() {
    this.spinner.show();
    this.cursoService.delete(this.excluirData.cursoId)
      .subscribe(
        () => {
          this.toastr.success('Curso excluído', 'Sucesso');
          this.dialogRef.close('Excluir');
        },
        (error) => {
          this.toastr.error(error.error);
          console.error(error);
        }
      ).add(() => this.spinner.hide());
  }
}
