import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    ProjetosComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
