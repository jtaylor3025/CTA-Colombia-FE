import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPaisComponent } from './lista-pais/lista-pais.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lista-pais', component: ListaPaisComponent },
      { path: '**', redirectTo: 'lista-pais' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaisRoutingModule {}
