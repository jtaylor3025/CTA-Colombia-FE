import { Component, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Pageable } from 'src/app/core/models/pageable.model';
import { Empresa } from '../core/models/main.model';
import { EmpresasHttpService } from '../services/http/empresas-http.service';
import {
  merge,
  startWith,
  switchMap,
  map,
  takeUntil,
  Subject,
  filter,
} from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdministrarEmpresaComponent } from '../administrar-empresa/administrar-empresa.component';
import { adminPopUpType } from '../core/types/main.type';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.scss'],
})
export class ListaEmpresasComponent implements AfterViewInit, OnDestroy {
  private _clearSubscriptions$ = new Subject<void>();

  private _reloadData = new Subject<void>();

  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  public columnas = ['nit', 'nombre', 'representante', 'edit'];

  public empresas: Empresa[] = [];

  public totalResultados: number = 0;

  constructor(
    private readonly _empresaHttpService: EmpresasHttpService,
    private readonly _dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    merge(this.paginator.page, this._reloadData)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this._empresaHttpService.obtenerListaEmpresas(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((data: Pageable<Empresa>) => {
          if (data === null) {
            return [];
          }
          this.totalResultados = data.totalElements;
          return data.content;
        }),
        takeUntil(this._clearSubscriptions$)
      )
      .subscribe((data) => (this.empresas = data));
  }

  ngOnDestroy(): void {
    this._clearSubscriptions$.next();
  }

  administrarEmpresa(tipo: adminPopUpType, empresaNit?: string) {
    const modal = this._dialog.open(AdministrarEmpresaComponent, {
      data: { tipo, campo: empresaNit },
    });

    modal
      .afterClosed()
      .pipe(filter((reload) => Boolean(reload)))
      .subscribe((result) => {
        this._reloadData.next();
      });
  }
}
