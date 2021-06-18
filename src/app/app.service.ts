import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http'

@Injectable()
export class AppService {

  constructor(private http: Http) {}

  getCategories(_endpoint) {
    return this.http.get(_endpoint)
      .map((res:any) => res.json());   
  }

  getFilterCategories(_endpoint){
    return this.http.get(_endpoint)
    .map((res:any) => res.json());
  }

  getFood(_endpoint){
    return this.http.get(_endpoint)
      .map((res:any) => res.json()); 
  }

  getFoodById(_endpoint, id){
    return this.http.get(_endpoint + id)
    .map((res:any) => res.json()); 
  }
}
