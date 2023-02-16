import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pageable } from 'src/app/core/models/pageable.model';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Arl } from '../../core/models/main.models';

@Injectable()
export class ArlHttpService {
  constructor(private readonly _http: HttpClient) {}

  obtenerListaArl(page: number, pageSize: number): Observable<Pageable<Arl>> {
    const params = new HttpParams()
      .append('page', page)
      .append('pageSize', pageSize);

    return this._http
      .get<Pageable<Arl>>(`${environment.api}/arl/page`, { params })
      .pipe(tap(console.log));
  }
}
