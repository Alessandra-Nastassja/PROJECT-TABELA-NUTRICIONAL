import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http'

@Injectable()
export class AppService {
  urlCors = 'https://cors-anywhere.herokuapp.com/';

  constructor(private http: Http) {}

  getCategories() {
    return this.http.get("http://taco-food-api.herokuapp.com/api/v1/category")
      .map(res => res.json());   
  }

  getFilterCategories(idCategoria){
    return this.http.get("https://taco-food-api.herokuapp.com/api/v1/category/"+ idCategoria + "/food")
    .map(res => res.json());
  }

  getFood(){
    return this.http.get("https://taco-food-api.herokuapp.com/api/v1/food")
      .map(res => res.json()); 
  }

  getFoodById(id){
    return this.http.get("https://taco-food-api.herokuapp.com/api/v1/food/"+ id)
    .map(res => res.json()); 
  }
}
