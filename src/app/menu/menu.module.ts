import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MaterialAngularModule } from '../material-angular.module';
import { MenuRoutingModule } from './menu-routing.module';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MaterialAngularModule,
    MatIconModule,
  ],
})
export class MenuModule {}
