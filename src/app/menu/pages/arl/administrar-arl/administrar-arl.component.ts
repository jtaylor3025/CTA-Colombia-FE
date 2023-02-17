import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { adminPopUp } from '../../../core/types/main.type';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-administrar-arl',
  templateUrl: './administrar-arl.component.html',
  styleUrls: ['./administrar-arl.component.scss'],
})
export class AdministrarArlComponent implements OnInit {
  public readonly arlForm: FormGroup;
  constructor(
    formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: adminPopUp<string>
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
  }
}
