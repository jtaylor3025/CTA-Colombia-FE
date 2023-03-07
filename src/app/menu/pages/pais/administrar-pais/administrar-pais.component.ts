import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { adminPopUp } from '../../empresas/core/types/main.type';
import { PaisHttpService } from '../services/http/pais-http.service';

@Component({
  selector: 'app-administrar-pais',
  templateUrl: './administrar-pais.component.html',
  styleUrls: ['./administrar-pais.component.scss'],
})
export class AdministrarPaisComponent implements OnInit {
  public readonly paisForm: FormGroup;
  constructor(
    private _dialogRef: MatDialogRef<AdministrarPaisComponent>,
    private _paisHttpService: PaisHttpService,
    formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>
  ) {
    this.paisForm = formBuilder.group({
      paisId: [{ value: '', disabled: true }],
      paisNombre: ['', Validators.required],
    });
  }

  titulo: String = '';
  subtitulo: String = '';
  ngOnInit(): void {
    const { tipo, campo } = this.data;
    this.titulo =
      this.data.tipo == 'crear' ? 'Crear nuevo País' : 'Editar País';
    this.subtitulo =
      this.data.tipo == 'crear'
        ? 'Ingrese los datos para crear un nuevo país'
        : 'Ingrese los nuevos datos del país';

    if (tipo == 'editar')
      this._paisHttpService
        .ObtenerPaisPorId(campo!)
        .subscribe((pais) => this.paisForm.setValue(pais));
  }

  public crearPais(): void {
    const { invalid, value } = this.paisForm;
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
    const metodoEjecutar: keyof PaisHttpService = esTipoCrear
      ? 'crearPais'
      : 'editarPais';
    const pais = this.obtenerPais(esTipoCrear);
    this._paisHttpService[metodoEjecutar](pais).subscribe((mensaje) =>
      this.mostrarMensajeEjecucion(tipo, mensaje)
    );
  }

  private mostrarMensajeEjecucion(tipo: any, message: any) {
    const tipoMensaje = tipo == 'crear' ? 'creada' : 'actualizada';
    Swal.fire(
      'Transaccion exitosa',
      `El País ha sido ${tipoMensaje} con exito`,
      'success'
    );
    this._dialogRef.close(true);
  }

  public obtenerPais(esTipoCrear: Boolean) {
    let pais = this.paisForm.value;
    if (!esTipoCrear) {
      const paisId = this.paisForm.get('paisId')!.value;
      pais = { ...pais, paisId };
    }
    return pais;
  }
}
