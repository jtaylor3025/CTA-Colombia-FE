import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pageable } from 'src/app/core/models/pageable.model';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { Empresa } from '../../core/models/main.model';

@Injectable()
export class EmpresasHttpService {
  constructor(private readonly _http: HttpClient) {}

  obtenerListaEmpresas(
    page: number,
    pageSize: number
  ): Observable<Pageable<Empresa>> {
    const params = new HttpParams()
      .append('page', page)
      .append('pageSize', pageSize);

    return this._http
      .get<Pageable<Empresa>>(`${environment.api}/empresas/page`, {
        params,
      })
      .pipe(tap(console.log));
  }
}
