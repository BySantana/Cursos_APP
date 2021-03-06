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

  put(curso: Curso, id: number){
    return this.httpClient.put(this.baseUrl+'put/'+id, curso);
  }

  delete(id: number){
    return this.httpClient.delete(this.baseUrl+'delete/'+id)
  }

  getAllByDatas(dataInicio: string, dataTermino: string){
    return this.httpClient.get(this.baseUrl+'cursos/'+dataInicio+'/'+dataTermino);
  }

  getAllByData(data: string){
    return this.httpClient.get(this.baseUrl+`curso/${data}`);
  }
}
