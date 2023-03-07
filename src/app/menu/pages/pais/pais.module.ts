import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPaisComponent } from './lista-pais/lista-pais.component';
import { AdministrarPaisComponent } from './administrar-pais/administrar-pais.component';



@NgModule({
  declarations: [
    ListaPaisComponent,
    AdministrarPaisComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PaisModule { }
