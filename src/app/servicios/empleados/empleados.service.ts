import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private http:HttpClient) { }

  public getEmpleados() {
    return new Promise((resolve,reject) => {

      this.http.get('http://localhost:3000/empleados')
      .subscribe(empleados => {
        resolve(empleados)
      },err => {
        reject(err)
      })
    })
  }

  public insertEmpleado(empleado) {

    return new Promise((resolve,reject) => {

      this.http.post('http://localhost:3000/empleados',empleado)
      .subscribe(res => {

        resolve(res)

      },err => {
        
        reject(err)
      }) 

    })

  }
  

  public updateEmpleado(empleado) {

    return new Promise((resolve,reject) => {

      this.http.put('http://localhost:3000/empleados/' + empleado.id,empleado)
      .subscribe(res => {

        resolve(res)

      },err => {
        reject(err)
      }) 

    })

  }

  public deleteEmpleado(empleado) {

    return new Promise((resolve,reject) => {

      this.http.delete('http://localhost:3000/empleados/' + empleado.id)
      .subscribe(res => {

        resolve(res)

      },err => {
        reject(err)
      }) 

    })

  }



}
