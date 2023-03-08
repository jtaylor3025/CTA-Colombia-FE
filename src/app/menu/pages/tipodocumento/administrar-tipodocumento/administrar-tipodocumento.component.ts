import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { adminPopUp } from '../../empresas/core/types/main.type';
import { TipodocumentoHttpService } from '../services/http/tipodocumento-http.service';

@Component({
  selector: 'app-administrar-tipodocumento',
  templateUrl: './administrar-tipodocumento.component.html',
  styleUrls: ['./administrar-tipodocumento.component.scss'],
})
export class AdministrarTipodocumentoComponent implements OnInit {
  public readonly tipodocuForm: FormGroup;
  constructor(
    private _dialogRef: MatDialogRef<AdministrarTipodocumentoComponent>,
    private _tipodocuHttpService: TipodocumentoHttpService,
    private _router: Router,
    formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>
  ) {
    this.tipodocuForm = formBuilder.group({
      tipodocuId: [{ value: '', disabled: true }],
      tipodocuNombre: ['', Validators.required],
    });
  }

  titulo: String = '';
  subtitulo: String = '';
  ngOnInit(): void {
    const { tipo, campo } = this.data;
    this.titulo =
      this.data.tipo == 'crear'
        ? 'Crear nuevo tipo de documento'
        : 'Editar tipo de documento';
    this.subtitulo =
      this.data.tipo == 'crear'
        ? 'Ingrese los datos para crear un nuevo tipo de documento'
        : 'Ingrese los nuevos datos para editar tipo de documento';

    if (tipo == 'editar')
      this._tipodocuHttpService
        .obtenerTipoDocuId(campo!)
        .subscribe((tipodocumento) =>
          this.tipodocuForm.setValue(tipodocumento)
        );
  }

  public crearTipoDocumento(): void {
    const { invalid, value } = this.tipodocuForm;
    if (invalid) {
      Swal.fire(
        'Porfavor espere',
        'Existen campos que no son validos',
        'warning'
      );
      return;
    }

    const { tipo, campo } = this.data;
    const esTipoCrear = tipo == 'crear';
    const metodoEjecutar: keyof TipodocumentoHttpService = esTipoCrear
      ? 'crearTipoDocu'
      : 'editarTipoDocu';
    const tipodocu = this.obtenerTipoDocu(esTipoCrear);
    this._tipodocuHttpService[metodoEjecutar](tipodocu).subscribe((mensaje) => {
      this.mostrarMensajeEjecucion(tipo, mensaje);
    });
    this._router.navigate(['tipodocumento/lista-documento']);
  }

  public obtenerTipoDocu(esTipoCrear: Boolean) {
    let tipodocu = this.tipodocuForm.value;
    if (!esTipoCrear) {
      const tipodocuId = this.tipodocuForm.get('tipodocuId')!.value;
      tipodocu = { ...tipodocu, tipodocuId };
    }
    return tipodocu;
  }

  public mostrarMensajeEjecucion(tipo: any, message: any) {
    const tipoMensaje = tipo == 'crear' ? 'creada' : 'actualizada';
    Swal.fire(
      'Transaccion exitosa',
      `El Tipo de documento ha sido ${tipoMensaje} con exito`,
      'success'
    );
    this._dialogRef.close(true);
  }
}
