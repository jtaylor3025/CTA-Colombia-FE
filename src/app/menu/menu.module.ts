import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MaterialAngularModule } from '../material-angular.module';
import { MenuRoutingModule } from './menu-routing.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, MenuRoutingModule, MaterialAngularModule],
})
export class MenuModule {}
