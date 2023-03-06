import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramaRoutingModule } from './programa-routing.module';
import { AdministrarProgramaComponent } from './administrar-programa/administrar-programa.component';
import { ListaProgramaComponent } from './lista-programa/lista-programa.component';

@NgModule({
  declarations: [AdministrarProgramaComponent, ListaProgramaComponent],
  imports: [CommonModule, ProgramaRoutingModule],
})
export class ProgramaModule {}
