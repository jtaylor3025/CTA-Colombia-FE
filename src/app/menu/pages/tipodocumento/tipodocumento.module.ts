import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTipodocumentoComponent } from './lista-tipodocumento/lista-tipodocumento.component';
import { AdministrarTipodocumentoComponent } from './administrar-tipodocumento/administrar-tipodocumento.component';



@NgModule({
  declarations: [
    ListaTipodocumentoComponent,
    AdministrarTipodocumentoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TipodocumentoModule { }
