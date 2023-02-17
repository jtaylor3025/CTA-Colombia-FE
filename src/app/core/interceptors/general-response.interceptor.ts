import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class GeneralResponseHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const request = req.clone();

    return next.handle(request).pipe(
      map((resp) => {
        if (!(resp.type === HttpEventType.Response)) return resp;

        const { data, code, message, success } = resp.clone()?.body ?? {};
        if (!success) Swal.fire('Un error a ocurrido', message, 'error');
        else if (code !== HttpStatusCode.Ok && code !== HttpStatusCode.Accepted)
          Swal.fire('Porfavor espere', message, 'warning');

        return resp.clone({ body: data });
      })
    );
  }
}
