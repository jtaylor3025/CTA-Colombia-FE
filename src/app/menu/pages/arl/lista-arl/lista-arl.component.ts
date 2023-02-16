import { Component, OnInit, ViewChild } from '@angular/core';
import { Arl } from '../core/models/main.models';
import { MatPaginator } from '@angular/material/paginator';
import { Pageable } from 'src/app/core/models/pageable.model';
import { ArlHttpService } from '../sevices/http/arl-http.service';
import { merge, startWith, switchMap, map, takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-lista-arl',
  templateUrl: './lista-arl.component.html',
  styleUrls: ['./lista-arl.component.scss'],
})
export class ListaArlComponent {
  private _clearSubscriptions$ = new Subject<void>();
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  public arl: Arl[] = [];
  public columnas = ['id', 'nombre', 'edit'];
  public totalResultados: number = 0;

  constructor(private readonly _arlHttpService: ArlHttpService) {}

  ngAfterViewInit(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this._arlHttpService.obtenerListaArl(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((data: Pageable<Arl>) => {
          if (data === null) {
            return [];
          }
          this.totalResultados = data.totalElements;
          return data.content;
        }),
        takeUntil(this._clearSubscriptions$)
      )
      .subscribe((data) => (this.arl = data));
  }
}
