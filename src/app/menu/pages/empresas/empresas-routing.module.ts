import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { CrearEmpresaComponent } from './crear-empresa/crear-empresa.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lista-empresas', component: ListaEmpresasComponent },
      { path: 'editar-empresa/:id', component: EditarEmpresaComponent },
      { path: 'crear-empresa', component: CrearEmpresaComponent },
      { path: '**', redirectTo: 'lista-empresas' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresasRoutingModule {}
