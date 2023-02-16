import { NgModule } from '@angular/core';
import { ListaArlComponent } from './lista-arl/lista-arl.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lista-arl', component: ListaArlComponent },
      { path: '**', redirectTo: 'lista-arl' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArlRoutingModule {}
