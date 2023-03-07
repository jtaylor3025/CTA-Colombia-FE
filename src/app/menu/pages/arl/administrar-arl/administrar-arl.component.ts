import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { adminPopUp } from '../../../core/types/main.type';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArlHttpService } from '../sevices/http/arl-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-arl',
  templateUrl: './administrar-arl.component.html',
  styleUrls: ['./administrar-arl.component.scss'],
})
export class AdministrarArlComponent implements OnInit {
  public readonly arlForm: FormGroup;
  constructor(
    private _dialogRef: MatDialogRef<AdministrarArlComponent>,
    private _arlHttpService: ArlHttpService,
    formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>
  ) {
    this.arlForm = formBuilder.group({
      arlId: [{ value: '', disabled: true }],
      arlNombre: ['', Validators.required],
    });
  }

  titulo: String = '';
  subtitulo: String = '';
  ngOnInit(): void {
    const { tipo, campo } = this.data;
    this.titulo = this.data.tipo == 'crear' ? 'Crear nueva ARL' : 'Editar ARL';
    this.subtitulo =
      this.data.tipo == 'crear'
        ? 'Ingrese los datos para crear una nueva ARL'
        : 'Ingrese los nuevos datos de la ARL';

    if (tipo == 'editar')
      this._arlHttpService
        .ObtenerArlPorId(campo!)
        .subscribe((arl) => this.arlForm.setValue(arl));
  }

  public crearArl(): void {
    const { invalid, value } = this.arlForm;
    if (invalid) {
      Swal.fire(
        'Porfavor espere',
        'Existen campos que no son validos',
        'warning'
      );
      return;
    }

    const { tipo, campo } = this.data;
    const esTipoCrear = tipo === 'crear';
    const metodoEjecutar: keyof ArlHttpService = esTipoCrear
      ? 'crearArl'
      : 'administrarArl';
    const arl = this.obtenerArl(esTipoCrear);
    this._arlHttpService[metodoEjecutar](arl).subscribe((mensaje) =>
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

  private obtenerArl(esTipoCrear: boolean) {
    let arl = this.arlForm.value;

    if (!esTipoCrear) {
      const arlId = this.arlForm.get('arlId')!.value;
      arl = { ...arl, arlId };
    }
    return arl;
  }
}
