import { Component, OnInit, ViewChild } from '@angular/core';
import { Pais } from '../core/models/main.model';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Pageable } from 'src/app/core/models/pageable.model';
import { PaisHttpService } from '../services/http/pais-http.service';
import {
  merge,
  startWith,
  switchMap,
  map,
  takeUntil,
  Subject,
  filter,
} from 'rxjs';
import { adminPopUpType } from 'src/app/menu/core/types/main.type';
import { AdministrarPaisComponent } from '../administrar-pais/administrar-pais.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-pais',
  templateUrl: './lista-pais.component.html',
  styleUrls: ['./lista-pais.component.scss'],
})
export class ListaPaisComponent {
  private _clearSubscriptions$ = new Subject<void>();
  private _reloadData = new Subject<void>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  public pais: Pais[] = [];
  public columnas = ['paisId', 'paisNombre', 'edit'];
  public totalResultados: number = 0;

  constructor(
    private readonly _paisHttpService: PaisHttpService,
    private readonly _dialog: MatDialog,
    private paginator2: MatPaginatorIntl
  ) {
    paginator2.itemsPerPageLabel = 'Elementos por pagina';
    console.log(paginator2.getRangeLabel);
  }

  ngAfterViewInit(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this._paisHttpService.obtenerListaPais(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((data: Pageable<Pais>) => {
          if (data === null) {
            return [];
          }
          this.totalResultados = data.totalElements;
          return data.content;
        }),
        takeUntil(this._clearSubscriptions$)
      )
      .subscribe((data) => (this.pais = data));
  }

  administrarPais(tipo: adminPopUpType, paisId?: number) {
    const modal = this._dialog.open(AdministrarPaisComponent, {
      data: { tipo, campo: paisId },
    });
    modal
      .afterClosed()
      .pipe(filter((reload) => Boolean(reload)))
      .subscribe((result) => {
        this._reloadData.next();
      });
  }
}
