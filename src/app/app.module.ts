import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

//Componentes
import { LoginComponent } from './components/login/login.component';
// import { HeaderComponent } from './components/header/header.component';
// import { EmpresasComponent } from './components/empresas/empresas.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MaterialAngularModule } from './material-angular.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // HeaderComponent,
    // EmpresasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialAngularModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
