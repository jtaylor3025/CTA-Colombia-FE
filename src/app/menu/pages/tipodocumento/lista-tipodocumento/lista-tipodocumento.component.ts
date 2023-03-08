import { Component, ViewChild } from '@angular/core';
import { Tipodocumento } from '../core/models/main.model';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Pageable } from 'src/app/core/models/pageable.model';
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
import { MatDialog } from '@angular/material/dialog';
import { TipodocumentoHttpService } from '../services/http/tipodocumento-http.service';
import { AdministrarTipodocumentoComponent } from '../administrar-tipodocumento/administrar-tipodocumento.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-tipodocumento',
  templateUrl: './lista-tipodocumento.component.html',
  styleUrls: ['./lista-tipodocumento.component.scss'],
})
export class ListaTipodocumentoComponent {
  private _clearSubscription$ = new Subject<void>();
  private _reloadData = new Subject<void>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  public tipodocumento: Tipodocumento[] = [];
  public columnas = ['tipodocuId', 'tipodocuNombre', 'edit'];
  public totalResultados: number = 0;

  constructor(
    private readonly _tipodocuHttpService: TipodocumentoHttpService,
    private readonly _dialog: MatDialog,
    private _router: Router,
    private paginator2: MatPaginatorIntl
  ) {
    paginator2.itemsPerPageLabel = 'Elementos por pagina';
  }

  ngAfterViewInit(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this._tipodocuHttpService.obtenerListaTipodocumento(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((data: Pageable<Tipodocumento>) => {
          if (data === null) {
            return [];
          }
          this.totalResultados = data.totalElements;
          return data.content;
        }),
        takeUntil(this._clearSubscription$)
      )
      .subscribe((data) => (this.tipodocumento = data));
  }

  administrarTipoDocumento(tipo: adminPopUpType, tipodocuId?: number) {
    const modal = this._dialog.open(AdministrarTipodocumentoComponent, {
      data: { tipo, campo: tipodocuId },
    });
    modal
      .afterClosed()
      .pipe(filter((reload) => Boolean(reload)))
      .subscribe((result) => {
        this._router.navigate(['tipodocumento/lista-documento']);
        this._reloadData.next();
      });
  }
}
