import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTipodocumentoComponent } from './lista-tipodocumento/lista-tipodocumento.component';
import { AdministrarTipodocumentoComponent } from './administrar-tipodocumento/administrar-tipodocumento.component';
import { TipodocumentoRoutingModule } from './tipodocumento-routing.module';
import { MaterialAngularModule } from 'src/app/material-angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TipodocumentoHttpService } from './services/http/tipodocumento-http.service';
import { GeneralResponseHttpInterceptor } from 'src/app/core/interceptors/general-response.interceptor';

@NgModule({
  declarations: [
    ListaTipodocumentoComponent,
    AdministrarTipodocumentoComponent,
  ],
  imports: [
    CommonModule,
    TipodocumentoRoutingModule,
    MaterialAngularModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    TipodocumentoHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GeneralResponseHttpInterceptor,
      multi: true,
    },
  ],
})
export class TipodocumentoModule {}
