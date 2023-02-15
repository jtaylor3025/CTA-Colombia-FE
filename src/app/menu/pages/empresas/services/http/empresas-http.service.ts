import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pageable } from 'src/app/core/models/pageable.model';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
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

  administrarEmpresa(empresa: Empresa): Observable<Empresa> {
    return this._http.post(`${environment.api}/empresa`, empresa).pipe(
      map((response: any) => response.empresa as Empresa),
      catchError((e) => {
        if (e.status) {
          return throwError(e);
        }

        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /*
  path variable: this._http.get(`${environment.api}/getempresa/${empresaNit}`)
  query param: const params = new HttpParams().append('empresaNit', empresaNit);
  */
  obtenerEmpresaPorNit(empresaNit: string) {
    const params = new HttpParams().append('empresaNit', empresaNit);

    return this._http.get<Empresa>(`${environment.api}/empresas/nit`, {
      params,
    });
  }
}
