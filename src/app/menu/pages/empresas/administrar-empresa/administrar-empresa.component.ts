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

  ngOnInit(): void {
    const { tipo, campo } = this.data;

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

    this._empresasHttpService.administrarEmpresa(value).subscribe((empresa) => {
      this.router.navigate(['/lista-empresas']);
      const tipoPopUp = this.data.tipo == 'crear' ? 'creada' : 'editada';
      Swal.fire(
        'Nueva empresa!',
        `Empresa ${empresa.empresaNombre} ${tipoPopUp} con exito`,
        'success'
      );
      this._dialogRef.close();
    });
  }
}
