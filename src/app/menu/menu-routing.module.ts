import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';

const routes: Routes = [
  {
    path: 'empresas',
    component: MenuComponent,
    loadChildren: () =>
      import('./pages/empresas/empresas.module').then((m) => m.EmpresasModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'empresas' },
  {
    path: 'arl',
    component: MenuComponent,
    loadChildren: () =>
      import('./pages/arl/arl.module').then((m) => m.ArlModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
