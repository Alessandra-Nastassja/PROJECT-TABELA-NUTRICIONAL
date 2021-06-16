import { Component, OnInit, Input } from '@angular/core';

import { AppService } from '../app.service';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
  providers: [AppService]
})
export class FoodComponent implements OnInit {

  loading = {
    food: true
  }

  comidas = []
  filterCategoriaComida = [];
  idItem: any;
  idProduto = '';
  isLoading = true;
  querySearch = '';
  productId: any;
  toggleBtn = true;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.foodList();
  }

  foodList() {
    const endpoint = 'https://taco-food-api.herokuapp.com/api/v1/food';

    this.appService.getFood(endpoint)
    .finally(() => this.loading.food = false)
    .subscribe(
      success => {
          this.comidas = success;
      },error => {
        error == 500 && 'Listagem indisponível';
        error == 404 && 'Nenhuma informação por aqui';
      }
    );
  }

  // Pega o id do produto
  getIdProduto(event) {
    this.idItem = event.target.id;

    // this.getFilterCategorie(this.idItem);
  }

  // Realiza o filtro de comida pela categoria
  getFilterCategorie(event) {
    this.appService.getFilterCategories(event).subscribe(
      success => {
        this.comidas = success;
      }
    );
  }

  setProductId(_productId = ''){
    const endpoint = "https://taco-food-api.herokuapp.com/api/v1/food/";

   this.productId = _productId;

   this.appService.getFoodById(endpoint, this.productId)
   .finally(() => this.loading.food = false)
   .subscribe(
     success => {
       this.comidas = success;
     }, error => {
      error == 500 && 'Item indisponível';
      error == 404 && 'Nenhuma informação por aqui';
    });
  }

  toggle(){
    this.toggleBtn = !this.toggleBtn;
  }
}