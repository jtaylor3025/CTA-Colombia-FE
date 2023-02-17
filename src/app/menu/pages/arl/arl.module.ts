import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArlRoutingModule } from './arl-routing.module';
import { ListaArlComponent } from './lista-arl/lista-arl.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialAngularModule } from 'src/app/material-angular.module';
import { ArlHttpService } from './sevices/http/arl-http.service';
import { AdministrarArlComponent } from './administrar-arl/administrar-arl.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralResponseHttpInterceptor } from 'src/app/core/interceptors/general-response.interceptor';

@NgModule({
  declarations: [ListaArlComponent, AdministrarArlComponent],
  imports: [
    CommonModule,
    ArlRoutingModule,
    HttpClientModule,
    MaterialAngularModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ArlHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GeneralResponseHttpInterceptor,
      multi: true,
    },
  ],
})
export class ArlModule {}
