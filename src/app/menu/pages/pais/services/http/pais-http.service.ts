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
}
