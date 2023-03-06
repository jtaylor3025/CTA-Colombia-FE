import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProgramaComponent } from './lista-programa/lista-programa.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lista-programa', component: ListaProgramaComponent },
      { path: '**', redirectTo: 'lista-programa' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramaRoutingModule {}
