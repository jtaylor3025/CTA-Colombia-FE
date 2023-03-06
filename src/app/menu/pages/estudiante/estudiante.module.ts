import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteRoutingModule } from './estudiante-routing.module';
import { ListaEstudianteComponent } from './lista-estudiante/lista-estudiante.component';
import { AdministrarEstudianteComponent } from './administrar-estudiante/administrar-estudiante.component';

@NgModule({
  declarations: [ListaEstudianteComponent, AdministrarEstudianteComponent],
  imports: [CommonModule, EstudianteRoutingModule],
})
export class EstudianteModule {}
