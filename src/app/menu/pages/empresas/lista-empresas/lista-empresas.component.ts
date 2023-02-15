import { Component, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Pageable } from 'src/app/core/models/pageable.model';
import { Empresa } from '../core/models/main.model';
import { EmpresasHttpService } from '../services/http/empresas-http.service';
import { merge, startWith, switchMap, map, takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.scss'],
})
export class ListaEmpresasComponent implements AfterViewInit, OnDestroy {
  private _clearSubscriptions$ = new Subject<void>();

  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  // @ViewChild(MatSort) private sort!: MatSort;

  public columnas = ['nit', 'nombre', 'representante'];

  public empresas: Empresa[] = [];

  public totalResultados: number = 0;

  constructor(private readonly _empresaHttpService: EmpresasHttpService) {}

  ngAfterViewInit(): void {
    // this.sort.sortChange
    //   .pipe(takeUntil(this._clearSubscriptions$))
    //   .subscribe(() => (this.paginator.pageIndex = 0));
    //this.sort.sortChange
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          // this.isLoadingResults = true;
          return this._empresaHttpService.obtenerListaEmpresas(
            // this.sort.active,
            // this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((data: Pageable<Empresa>) => {
          // this.isLoadingResults = false;
          // this.isRateLimitReached = data === null;
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
}
