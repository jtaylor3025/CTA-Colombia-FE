import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tipodocumento } from '../../core/models/main.model';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Pageable } from 'src/app/core/models/pageable.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class TipodocumentoHttpService {
  constructor(private readonly _http: HttpClient) {}

  obtenerListaTipodocumento(
    page: number,
    pageSize: number
  ): Observable<Pageable<Tipodocumento>> {
    const params = new HttpParams()
      .append('page', page)
      .append('pageSize', pageSize);

    return this._http
      .get<Pageable<Tipodocumento>>(`${environment.api}/tipodocu/page`, {
        params,
      })
      .pipe(tap(console.log));
  }

  obtenerTipoDocuId(tipodocuId: number) {
    const params = new HttpParams().append('tipodocuId', tipodocuId);
    return this._http.get<Tipodocumento>(`${environment.api}/tipodocu/id`, {
      params,
    });
  }

  crearTipoDocu(tipodocumento: Tipodocumento): Observable<Tipodocumento> {
    return this._http
      .post(`${environment.api}/tipodocu/create`, tipodocumento)
      .pipe(map((response: any) => response.tipodocumento as Tipodocumento));
  }

  editarTipoDocu(tipodocumento: Tipodocumento): Observable<Tipodocumento> {
    return this._http
      .post(`${environment.api}/tipodocu/update`, tipodocumento)
      .pipe(map((response: any) => response.tipodocumento as Tipodocumento));
  }
}
