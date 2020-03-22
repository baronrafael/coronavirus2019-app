import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private httpClient: HttpClient) {}

  getLocationWithIP() {
    return this.httpClient.get('https://ipapi.co/json');
  }
}
