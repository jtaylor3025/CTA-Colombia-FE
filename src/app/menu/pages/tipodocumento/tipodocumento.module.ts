import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTipodocumentoComponent } from './lista-tipodocumento/lista-tipodocumento.component';
import { AdministrarTipodocumentoComponent } from './administrar-tipodocumento/administrar-tipodocumento.component';
import { TipodocumentoRoutingModule } from './tipodocumento-routing.module';

@NgModule({
  declarations: [
    ListaTipodocumentoComponent,
    AdministrarTipodocumentoComponent,
  ],
  imports: [CommonModule, TipodocumentoRoutingModule],
})
export class TipodocumentoModule {}
