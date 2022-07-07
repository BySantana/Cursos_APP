/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Curso_listaComponent } from './curso_lista.component';

describe('Curso_listaComponent', () => {
  let component: Curso_listaComponent;
  let fixture: ComponentFixture<Curso_listaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Curso_listaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Curso_listaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
