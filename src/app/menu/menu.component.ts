import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';

import { AppService } from './../app.service';
import 'rxjs/add/operator/finally';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [AppService]
})
export class MenuComponent implements OnInit {

  loading = {
    categories: true
  }

  categories: Array<Object>
  foods: Array<Object>

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.categoriesList();
  }

  categoriesList(){
    const endpoint = `${environment.tacoFoods}/category`;

    this.appService.getCategories(endpoint)
    .finally(() => this.loading.categories = false)
    .subscribe(
      success => {
        this.categories = success;
      }, error => {
        error == 500 && 'Listagem indisponível';
        error == 404 && 'Nenhuma informação por aqui';
      }
    )
  }

  idCategory(_event) {
    let idCategory = _event.target.id;
    const endpoint = `${environment.tacoFoods}/category/${idCategory}/food`;

    this.appService.getFilterCategories(endpoint).subscribe(
      success => {
        this.foods = success;       
        
      }, error => {
        error == 500 && 'Listagem indisponível';
        error == 404 && 'Nenhuma informação por aqui';
      }
    );
  }
}
