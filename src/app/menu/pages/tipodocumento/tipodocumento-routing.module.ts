import { NgModule } from '@angular/core';
import { ListaTipodocumentoComponent } from './lista-tipodocumento/lista-tipodocumento.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lista-tipodocumento', component: ListaTipodocumentoComponent },
      { path: '**', redirectTo: 'lista-tipodocumento' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipodocumentoRoutingModule {}
