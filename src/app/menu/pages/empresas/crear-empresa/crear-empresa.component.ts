import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../core/models/main.model';
import { EmpresasHttpService } from '../services/http/empresas-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.scss'],
})
export class CrearEmpresaComponent implements OnInit {
  public readonly empresaForm: FormGroup;

  constructor(
    private EmpresasHttpService: EmpresasHttpService,
    private router: Router,
    formBuilder: FormBuilder
  ) {
    this.empresaForm = formBuilder.group({
      empresaNit: ['', Validators.required],
      empresaNombre: ['', Validators.required],
      empresaRepresentante: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

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

    this.EmpresasHttpService.administrarEmpresa(value).subscribe((empresa) => {
      this.router.navigate(['/lista-empresas']);
      Swal.fire(
        'Nueva empresa!',
        `Empresa ${empresa.empresaNombre} creada con exito`,
        'success'
      );
    });
  }
}
