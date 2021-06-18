import { Component, OnInit } from '@angular/core';
declare var $: any;

import { environment } from '../../environments/environment';

import { AppService } from '../app.service';
import 'rxjs/add/operator/finally';


@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
  providers: [AppService]
})
export class FoodComponent implements OnInit {

  loading = { food: true, categories: true }

  productId: string;

  categories: Array<Object>
  foods: any

  alerts = [];

  translateCategories = [
    { id: 1, category: "Cereais e derivados" },
    { id: 2, category: "Verduras, hortaliças e derivados" },
    { id: 3, category: "Frutas e derivados" },
    { id: 4, category: "Gorduras e óleos" },
    { id: 5, category: "Pescados e frutos do mar" },
    { id: 6, category: "Carnes e derivados" },
    { id: 7, category: "Leite e derivados" },
    { id: 8, category: "Bebidas (alcoólicas e não alcoólicas)" },
    { id: 9, category: "Ovos e derivados" },
    { id: 10, category: "Produtos açucarados" },
    { id: 11, category: "Miscelâneas" },
    { id: 12, category: "Outros alimentos industrializados" },
    { id: 13, category: "Alimentos preparados" },
    { id: 14, category: "Leguminosas e derivados" },
    { id: 15, category: "Nozes e sementes" }
  ]

  constructor(
    private appService: AppService) { }

  ngOnInit() {
    this.foodList();
    this.categoriesList();
  }

  foodList(): void {
    const endpoint = `${environment.tacoFoods}/food`;

    this.appService.getFood(endpoint)
      .finally(() => this.loading.food = false)
      .subscribe(
        success => {
          this.foods = success;
          
          this.setCategories();

          $('[data-toggle="tooltip"]').tooltip();

        }, error => {
          error == 500 && 'Listagem indisponível';
          error == 404 && 'Nenhuma informação por aqui';
        }
      );
  }

  categoriesList(): void {
    const endpoint = `${environment.tacoFoods}/category`;

    this.appService.getCategories(endpoint)
      .finally(() => this.loading.categories = false)
      .subscribe(
        success => {
          this.categories = success;

          this.categories.push({ category: "Todas categorias", id: 'all' })
        }, error => {
          error == 500 && 'Listagem indisponível';
          error == 404 && 'Nenhuma informação por aqui';
        }
      )
  }

  idCategory(_event): void {
    let idCategory = _event.target.value;
    const endpoint = `${environment.tacoFoods}/category/${idCategory}/food`;

    if (idCategory != 'all') {
      this.appService.getFilterCategories(endpoint)
        .finally(() => this.loading.categories = false)
        .subscribe(
          success => {
            this.foods = success;

            this.setCategories();
          }, error => {
            error == 500 && this.alerts.push({ message: 'Listagem indisponível', color: 'alert-danger' });
            error == 404 && this.alerts.push({ message: 'Nenhuma informação por aqui', color: 'alert-warning' });
          }
        );
    } else {
      this.foodList();
    }

  }

  setCategories(): void{
    this.foods.map(e => {
      this.translateCategories.map(i => {
        if (e.category_id == i.id) {
          e['category_name'] = i.category;
        }
      })
    })
  }
}