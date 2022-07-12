import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
baseUrl = environment.apiURL +'api/Logs/';

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get(this.baseUrl);
  }


}
