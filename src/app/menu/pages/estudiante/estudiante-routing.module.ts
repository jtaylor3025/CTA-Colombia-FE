import { NgModule } from '@angular/core';
import { ListaEstudianteComponent } from './lista-estudiante/lista-estudiante.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lista-estudiante', component: ListaEstudianteComponent },
      { path: '**', redirectTo: 'lista-arl' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudianteRoutingModule {}
