import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tempData, energyData } from './models/data';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {}

  baseUrl = "http://localhost:3000/data";

  getAllTempData(){
    return this.http.get<tempData[]>(this.baseUrl + "/temp");
  }

  getLatestTempData(){
    return this.http.get<tempData>(this.baseUrl + "/temp/latest");
  }

  getAllEnergyData(){
    return this.http.get<energyData[]>(this.baseUrl+ "/energy");
  }

  getRecentEnergyData(){
    return this.http.get<energyData[]>(this.baseUrl+ "/energy/limited");
  }
  getLatestEnergyData(){
    return this.http.get<energyData>(this.baseUrl+ "/energy/latest");
  }
}
