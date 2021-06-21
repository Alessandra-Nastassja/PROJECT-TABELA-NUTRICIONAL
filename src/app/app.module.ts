import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FoodComponent } from './food/food.component';
import { ModalComponent } from './modal/modal.component';
import { AlertComponent } from './alert/alert.component';
import { TableComponent } from './table/table.component';

import { environment } from 'src/environments/environment';

import { AngularFireModule } from 'angularfire2';
import { TableService } from './table/table.service';
import { FoodService } from './food/food.service';

@NgModule({
  declarations: [
    AppComponent,
    FoodComponent,
    ModalComponent,
    AlertComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  bootstrap: [AppComponent],
  providers: [TableService, FoodService]
})
export class AppModule { }
