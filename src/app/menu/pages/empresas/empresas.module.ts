import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresasRoutingModule } from './empresas-routing.module';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { MaterialAngularModule } from 'src/app/material-angular.module';
import { HttpClientModule } from '@angular/common/http';
import { EmpresasHttpService } from './services/http/empresas-http.service';
import { CrearEmpresaComponent } from './crear-empresa/crear-empresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrarEmpresaComponent } from './administrar-empresa/administrar-empresa.component';

@NgModule({
  declarations: [
    ListaEmpresasComponent,
    EditarEmpresaComponent,
    CrearEmpresaComponent,
    AdministrarEmpresaComponent,
  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    MaterialAngularModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [EmpresasHttpService],
})
export class EmpresasModule {}
