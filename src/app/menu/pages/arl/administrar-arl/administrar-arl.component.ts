import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { adminPopUp } from '../../../core/types/main.type';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ArlHttpService } from '../sevices/http/arl-http.service';

@Component({
  selector: 'app-administrar-arl',
  templateUrl: './administrar-arl.component.html',
  styleUrls: ['./administrar-arl.component.scss'],
})
export class AdministrarArlComponent implements OnInit {
  public readonly arlForm: FormGroup;
  constructor(
    private _arlHttpService: ArlHttpService,
    formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<number>
  ) {
    this.arlForm = formBuilder.group({
      arlId: ['', Validators.required],
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
}
