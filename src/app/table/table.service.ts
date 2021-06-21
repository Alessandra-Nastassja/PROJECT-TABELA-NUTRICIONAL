import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Table } from './table.models';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  foods: AngularFirestoreCollection<Table>

  constructor(
    private db: AngularFirestore
  ) {
    this.setFoods();
  }

  private setFoods(): void {
    this.foods = this.db.collection<Table>('/table');
  }


  // update(food: Table): Promise<void> {
  //   return this.foods.doc<Table>(food.id)
  //     .update(food);
  // }

  delete(food: Table): Promise<void> {
    return this.foods.doc<Table>(food.id)
      .delete();
  }

  get(id: string): Observable<Table> {
    return this.foods.doc<Table>(id).valueChanges();
  }
}
