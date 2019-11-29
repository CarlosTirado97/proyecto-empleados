import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
 
  constructor(private http:HttpClient) { }

  public getDepartamentos() {

    return new Promise((resolve,reject) => {

      this.http.get('http://localhost:3000/departamentos')
      .subscribe(departamentos => {
        resolve(departamentos)
      },err => {
        reject(err)
      })

    })

  }

}
