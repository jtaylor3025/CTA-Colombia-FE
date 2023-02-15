import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
})
export class EmpresasComponent implements OnInit {
  columnas = ['nit', 'nombre', 'representante'];
  empresa: Empresa[] = [
    {
      nit: '123456',
      nombre: 'Empresa ejemplo',
      representante: 'Representante ejemplo',
    },
    {
      nit: '789456',
      nombre: 'Empresa ejemplo 2',
      representante: 'Representante ejemplo 2',
    },
    {
      nit: '456132',
      nombre: 'Empresa ejemplo 3',
      representante: 'Representante ejemplo 3',
    },
    {
      nit: '147852',
      nombre: 'Empresa ejemplo 4',
      representante: 'Representante ejemplo 4',
    },
    {
      nit: '963147',
      nombre: 'Empresa ejemplo 5',
      representante: 'Representante ejemplo 5',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
