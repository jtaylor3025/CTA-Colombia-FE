import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArlRoutingModule } from './arl-routing.module';
import { ListaArlComponent } from './lista-arl/lista-arl.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialAngularModule } from 'src/app/material-angular.module';
import { ArlHttpService } from './sevices/http/arl-http.service';

@NgModule({
  declarations: [ListaArlComponent],
  imports: [
    CommonModule,
    ArlRoutingModule,
    HttpClientModule,
    MaterialAngularModule,
  ],
  providers: [ArlHttpService],
})
export class ArlModule {}
