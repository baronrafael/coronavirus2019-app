import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NovelcovidService {

  private readonly getAllInfoUrl;

  constructor(private http: ApiService) {
    this.getAllInfoUrl = 'all';
   }

  getAllInfo(){
    return this.http.get(this.getAllInfoUrl);
  }

}
