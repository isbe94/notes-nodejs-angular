import { NgModule } from '@angular/core';
// módulo para trabajar con formularios
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
//Components
import { AppComponent } from './app.component';
import { NotasComponent } from './components/notas/notas.component';



@NgModule({
  declarations: [
    AppComponent,
    NotasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
