import { Curso } from 'src/app/models/Curso';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  baseUrl = environment.apiURL +'api/Curso/';
  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get(this.baseUrl);
  }

  post(curso: Curso){
    return this.httpClient.post(this.baseUrl, curso);
  }
}
