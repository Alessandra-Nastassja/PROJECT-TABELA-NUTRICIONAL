import { Component, OnInit, Input } from '@angular/core';

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

  productId: any;
  categories: Array<Object>
  foods: Array<Object>

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
      },error => {
        error == 500 && 'Listagem indisponível';
        error == 404 && 'Nenhuma informação por aqui';
      }
    );
  }

  categoriesList(): void{
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

  idCategory(_event): void {
    let idCategory = _event.target.value;
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