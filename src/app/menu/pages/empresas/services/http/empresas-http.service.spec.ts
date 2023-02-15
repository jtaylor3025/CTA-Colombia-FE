import { TestBed } from '@angular/core/testing';

import { EmpresasHttpService } from './empresas-http.service';

describe('EmpresasHttpService', () => {
  let service: EmpresasHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresasHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
