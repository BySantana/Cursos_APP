import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/Curso';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-NovoCurso',
  templateUrl: './NovoCurso.component.html',
  styleUrls: ['./NovoCurso.component.css']
})
export class NovoCursoComponent implements OnInit {

  form: FormGroup;
  novoCurso: Curso;

  constructor(private fb: FormBuilder,
    private cursoService: CursoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<NovoCursoComponent>) { }

  ngOnInit() {
    this.validation();
  }

  private validation(): void {
    const formOptions: AbstractControlOptions = {
    };

    this.form = this.fb.group(
      {
        cursoNome: ['', Validators.required],
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
    if (this.form.valid) {
      this.novoCurso = this.form.value;
      this.spinner.show();

      this.cursoService
        .post(this.novoCurso)
        .subscribe(
          () => { this.toastr.success('Curso criado', 'Sucesso');
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

  }

  public onSubmit() {
    this.criarCurso();
  }

  get f(): any {
    return this.form.controls;
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }
}
