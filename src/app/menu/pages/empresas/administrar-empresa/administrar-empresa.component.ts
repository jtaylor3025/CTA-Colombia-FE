import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresasHttpService } from '../services/http/empresas-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { adminPopUp } from '../core/types/main.type';

@Component({
  selector: 'app-administrar-empresa',
  templateUrl: './administrar-empresa.component.html',
  styleUrls: ['./administrar-empresa.component.scss'],
})
export class AdministrarEmpresaComponent implements OnInit {
  public readonly empresaForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<AdministrarEmpresaComponent>,
    private _empresasHttpService: EmpresasHttpService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<string>,
    formBuilder: FormBuilder
  ) {
    this.empresaForm = formBuilder.group({
      empresaNit: ['', Validators.required],
      empresaNombre: ['', Validators.required],
      empresaRepresentante: ['', Validators.required],
    });
  }

  titulo: String = '';
  subtitulo: String = '';

  ngOnInit(): void {
    const { tipo, campo } = this.data;
    this.titulo =
      this.data.tipo == 'crear' ? 'Crear nueva empresa' : 'Editar empresa';
    this.subtitulo =
      this.data.tipo == 'crear'
        ? 'Ingrese los datos para crear una nueva empresa'
        : 'Ingrese los nuevos datos de la emmpresa';
    if (tipo == 'editar')
      this._empresasHttpService
        .obtenerEmpresaPorNit(campo!)
        .subscribe((empresa) => this.empresaForm.setValue(empresa));
  }

  public createEmpresa(): void {
    const { invalid, value } = this.empresaForm;

    if (invalid) {
      Swal.fire(
        'Porfavor espere',
        `Existen campos que no son validos`,
        'warning'
      );
      return;
    }

    const { tipo, campo } = this.data;
    let metodoEjecutar: keyof EmpresasHttpService =
      tipo == 'crear' ? 'crearEmpresa' : 'administrarEmpresa';

    this._empresasHttpService[metodoEjecutar](value).subscribe((mensaje) =>
      this.mostrarMensajeEjecucion(tipo, mensaje)
    );
  }

  private mostrarMensajeEjecucion(tipo: any, message: any) {
    const tipoMensaje = tipo == 'crear' ? 'creada' : 'actualizada';
    Swal.fire(
      'Transaccion exitosa',
      `La empresa ha sido ${tipoMensaje} con exito`,
      'success'
    );
    this._dialogRef.close(true);
  }
}
