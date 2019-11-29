import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from '../../servicios/empleados/empleados.service';
import { DepartamentosService } from '../../servicios/departamentos/departamentos.service';
import { DatePipe } from "@angular/common";


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados:any = [];
  empleado = new Empleados(null,'','','','',null,null);

  accion = 1;


  departamentos:any = []; 
  
  grupoEmpleado = new FormGroup({
   Nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    ApPaterno: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    ApMaterno: new FormControl('', [Validators.required,Validators.maxLength(50)]),
    FecNac: new FormControl('', [Validators.required]),
    Departamento: new FormControl('', [Validators.required]),
    Sueldo: new FormControl('', [Validators.required]),
  });

  constructor(
    private empleadosService:EmpleadosService,
    private departamentosService:DepartamentosService,
    private datePipe:DatePipe
    ) {

    this.getEmpleados();
    this.getDepartamentos();

   }

  ngOnInit() {
  }

  async getEmpleados(){ 

    try {
      
      let empleados = await this.empleadosService.getEmpleados();
      this.empleados = empleados["empleados"];   
  
    } catch (error) {
      console.log(error)
    }

  }
  async getDepartamentos() {
    try {
      
      let departamentos = await this.departamentosService.getDepartamentos();

      this.departamentos = departamentos["departamentos"]

    } catch (error) {
        console.log(error)
    }
  }

  agregarEmpleado() {
    this.accion = 1;

    this.empleado = new Empleados(null,'','','','',null,null);
    
    this.grupoEmpleado.get('Nombre').setErrors({'required':true});
    this.grupoEmpleado.get('ApPaterno').setErrors({'required':true});
    this.grupoEmpleado.get('ApMaterno').setErrors({'required':true});
    this.grupoEmpleado.get('Departamento').setErrors({'required':true});
    this.grupoEmpleado.get('FecNac').setErrors({'required':true});
    this.grupoEmpleado.get('Sueldo').setErrors({'required':true});

  }
  
  modificarEmpleado(empleado) {

    this.accion = 2;

    this.empleado.id = empleado.id;
    this.empleado.Nombre = empleado.Nombre;
    this.empleado.ApPaterno = empleado.ApPaterno;
    this.empleado.ApMaterno = empleado.ApMaterno;
    this.empleado.FecNac = empleado.FecNac;
    this.empleado.Departamento = empleado.Departamento;
    this.empleado.Sueldo = empleado.Sueldo

    this.empleado.FecNac = this.datePipe.transform(this.empleado.FecNac,'yyyy-MM-dd')
    
  }

  async insertUpdateEmpleado() {

    try {
      this.empleado.FecNac = this.datePipe.transform(this.empleado.FecNac,'yyyy-MM-dd')
     
      if(this.accion == 1) {
        let empleado = await this.empleadosService.insertEmpleado(this.empleado)
      }

      if(this.accion == 2) {
        let empleado = await this.empleadosService.updateEmpleado(this.empleado)
      }
      
      this.getEmpleados();

    } catch (error) {
      console.log(error)
    }
  }

  async deleteEmpleado(empleado) {
    try {
      
      let confirmar = confirm(`Estas seguro que deseas eliminar al empleado ${empleado.Nombre} ?`);
      if(confirmar) {
        await this.empleadosService.deleteEmpleado(empleado);
        this.getEmpleados();
      }else {
        return false;
      }

    } catch (error) {
      console.log(error)
    }
  }



}


class Empleados {
  constructor(
    public id:number,
    public Nombre:string,
    public ApPaterno:string,
    public ApMaterno:string,
    public FecNac:string,
    public Departamento:number,
    public Sueldo:number
  ) {}
}