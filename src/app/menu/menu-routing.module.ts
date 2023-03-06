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
  {
    path: 'arl',
    component: MenuComponent,
    loadChildren: () =>
      import('./pages/arl/arl.module').then((m) => m.ArlModule),
  },
  {
    path: 'estudiante',
    component: MenuComponent,
    loadChildren: () =>
      import('./pages/estudiante/estudiante.module').then(
        (m) => m.EstudianteModule
      ),
  },
  {
    path: 'programa',
    component: MenuComponent,
    loadChildren: () =>
      import('./pages/programa/programa.module').then((m) => m.ProgramaModule),
  },
  {
    path: 'tipodocumento',
    component: MenuComponent,
    loadChildren: () =>
      import('./pages/tipodocumento/tipodocumento.module').then(
        (m) => m.TipodocumentoModule
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'empresas' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
