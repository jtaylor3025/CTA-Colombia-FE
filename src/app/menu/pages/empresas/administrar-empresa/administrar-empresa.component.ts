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

    if (tipo == 'crear') {
      this._empresasHttpService.crearEmpresa(value).subscribe((empresa) => {
        this.router.navigate(['/lista-empresas']);

        Swal.fire(
          'Nueva empresa!',
          `Empresa ${empresa.empresaNombre} creada con exito`,
          'success'
        );
        this._dialogRef.close();
      });
    } else {
      this._empresasHttpService
        .administrarEmpresa(value)
        .subscribe((empresa) => {
          this.router.navigate(['/lista-empresas']);

          Swal.fire(
            'Se actualizó la empresa!',
            `Empresa ${empresa.empresaNombre} editada con exito`,
            'success'
          );
          this._dialogRef.close();
        });
    }
  }
}
