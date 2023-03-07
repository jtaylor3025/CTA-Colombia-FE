import { Injectable } from '@angular/core';
import { Pageable } from 'src/app/core/models/pageable.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Pais } from '../../core/models/main.model';

@Injectable()
export class PaisHttpService {
  constructor(private readonly _http: HttpClient) {}

  obtenerListaPais(page: number, pageSize: number): Observable<Pageable<Pais>> {
    const params = new HttpParams()
      .append('page', page)
      .append('pageSize', pageSize);

    return this._http
      .get<Pageable<Pais>>(`${environment.api}/pais/page`, { params })
      .pipe(tap(console.log));
  }

  ObtenerPaisPorId(paisId: number) {
    const params = new HttpParams().append('paisId', paisId);
    return this._http.get<Pais>(`${environment.api}/pais/id`, {
      params,
    });
  }

  crearPais(pais: Pais): Observable<Pais> {
    return this._http.post(`${environment.api}/pais/create`, pais).pipe(
      map((response: any) => response.pais as Pais),
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

  editarPais(pais: Pais): Observable<Pais> {
    return this._http.post(`${environment.api}/pais/update`, pais).pipe(
      map((response: any) => response.pais as Pais),
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
}
