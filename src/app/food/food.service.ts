import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Table } from '../table/table.models';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  foods: AngularFirestoreCollection<Table>

  constructor(
    private db: AngularFirestore
  ) {
    this.setFoods();
   }

  private setFoods(): void {
    this.foods = this.db.collection<Table>('/table');
  }

  create(food: Table): Promise<void> {
    const id = this.db.createId();

    return this.foods.doc<Table>(id)
      .set({
        id,
        name: food.name,
        energy: food.energy
      });
  }
}
