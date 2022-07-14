import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/Curso';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-NovoCurso',
  templateUrl: './NovoCurso.component.html',
  styleUrls: ['./NovoCurso.component.css']
})
export class NovoCursoComponent implements OnInit {

  form: FormGroup;
  novoCurso: Curso;
  btnAcao: string = "Criar";

  constructor(private fb: FormBuilder,
    private cursoService: CursoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<NovoCursoComponent>,
  ) { }

  ngOnInit() {
    this.validation();
    console.log(this.editData);
    if (this.editData) {
      this.btnAcao = 'Atualizar';
      this.form.controls['descricao'].setValue(this.editData.descricao);
      this.form.controls['dataInicio'].setValue(this.editData.dataInicio);
      this.form.controls['dataTermino'].setValue(this.editData.dataTermino);
      this.form.controls['qtdAlunos'].setValue(this.editData.qtdAlunos);
      this.form.controls['categoriaId'].setValue(`${this.editData.categoriaId}`);
    }
  }

  private validation(): void {
    const formOptions: AbstractControlOptions = {
    };

    this.form = this.fb.group(
      {
        descricao: ['', Validators.required],
        dataInicio: ['', Validators.required],
        dataTermino: ['', Validators.required],
        qtdAlunos: ['', Validators.required],
        status: [true],
        categoriaId: ['', Validators.required],
      },
      formOptions
    );
  }

  public criarCurso() {
    if (!this.editData) {
      if (this.form.valid) {
        this.novoCurso = this.form.value;
        this.spinner.show();

        this.cursoService
          .post(this.novoCurso)
          .subscribe(
            () => {
              this.toastr.success('Curso criado', 'Sucesso');
              this.form.reset();
              this.dialogRef.close('Criar');
            },
            (error) => {
              this.toastr.error(error.error);
              console.error(error);
            }
          )
          .add(() => this.spinner.hide());
      }
    } else {
      this.updateCurso();
    }
  }

  updateCurso() {
    this.spinner.show();
    this.cursoService.put(this.form.value, this.editData.cursoId)
    .subscribe(
      () => {
        this.toastr.success('Curso atualizado', 'Sucesso');
        this.form.reset();
        this.dialogRef.close('Atualizar');
      },
      (error) => {
        this.toastr.error(error.error);
        console.error(error);
      }
    ).add(() => this.spinner.hide());
  }


  public onSubmit() {
    this.criarCurso();
  }


  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

  
}
