import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

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

  loading = {
    food: true
  }

  // FIXME: this feature isn't working 
  @Input() foods;
  @Output() foodsCategory = new EventEmitter();

  productId: any;
  toggleBtn = true;

  constructor(
    private appService: AppService) { }

  ngOnInit() {
    this.foodList();
  }

  filterFoods(){
    this.foodsCategory.emit(this.foods);
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

  toggle(){
    this.toggleBtn = !this.toggleBtn;
  }
}