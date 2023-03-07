import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPaisComponent } from './lista-pais/lista-pais.component';
import { AdministrarPaisComponent } from './administrar-pais/administrar-pais.component';
import { MaterialAngularModule } from 'src/app/material-angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaisRoutingModule } from './pais-routing.module';
import { PaisHttpService } from './services/http/pais-http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GeneralResponseHttpInterceptor } from 'src/app/core/interceptors/general-response.interceptor';

@NgModule({
  declarations: [ListaPaisComponent, AdministrarPaisComponent],
  imports: [
    CommonModule,
    PaisRoutingModule,
    HttpClientModule,
    MaterialAngularModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    PaisHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GeneralResponseHttpInterceptor,
      multi: true,
    },
  ],
})
export class PaisModule {}
