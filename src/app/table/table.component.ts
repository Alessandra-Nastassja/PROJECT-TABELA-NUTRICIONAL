import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Table } from './table.models';
import { TableService } from './table.service';

declare var $: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [AngularFirestore, TableService], 
})
export class TableComponent implements OnInit {

  alerts = [];
  
  loading = { table: false }

  foodsTable$: Observable<Table[]>

  @Input() viewTable = true;

  constructor(
    private db: AngularFirestore,
    private tableService: TableService
  ) { }

  ngOnInit() {
    this.foodsTable$ = this.db.collection<Table>('/table').valueChanges()
    // .finally(() => this.loading.table = false);
  }

  ngOnChanges(): void {
    $('#myModal').modal(this.viewTable)
  }

  deleteFood(_food){
    this.tableService.delete(_food)
    .then(() => {
      this.alerts.push({ message: 'Item deletado com sucesso!', color: 'alert-danger' });
    }).catch((error) => {
      error == 500 && this.alerts.push({ message: 'Listagem indisponível', color: 'alert-danger' });
      error == 404 && this.alerts.push({ message: 'Nenhuma informação por aqui', color: 'alert-warning' });
    })
  }
}