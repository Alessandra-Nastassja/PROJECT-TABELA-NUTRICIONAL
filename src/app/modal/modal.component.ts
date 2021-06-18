import { Component, Input, OnChanges } from '@angular/core';

import { environment } from '../../environments/environment';

import { AppService } from './../app.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [AppService]
})
export class ModalComponent implements OnChanges {

  loading = { detalheItem: true }

  @Input() idProduto = []

  alerts = [];
  detalheFood = []

  translateAttr = [
    { id: 1, name: 'Valor energético', attribute: 'energy' },
    { id: 2, name: 'Carboidratos', attribute: 'carbohydrate' },
    { id: 3, name: 'Proteínas', attribute: 'protein' },
    { id: 4, name: 'Gorduras totais', attribute: 'fatty_acids', subAttribute: 'monounsaturated' },
    { id: 5, name: 'Gorduras saturadas', attribute: 'fatty_acids', subAttribute: 'saturated' },
    { id: 6, name: 'Gorduras trans', attribute: 'fatty_acids', subAttribute: 'polyunsaturated' },
    { id: 7, name: 'Fibra alimentar', attribute: 'fiber' },
    { id: 8, name: 'Sódio', attribute: 'sodium' },
  ]

  constructor(private appService: AppService) { }

  ngOnChanges() {
    this.idProduto && this.getInfoProdutos();
  }

  getInfoProdutos() {
    const endpoint = `${environment.tacoFoods}/food/`;

    this.appService.getFoodById(endpoint, this.idProduto)
      .finally(() => this.loading.detalheItem = false)
      .subscribe(
        success => {
          this.detalheFood = success;

          let attributes = this.detalheFood[0].attributes;

          let newAtrribute = [];
          this.translateAttr.map(e => {
            for (var key in attributes) {

              if (e.attribute == key) {
                newAtrribute.push(e)
              }
            }
          })
               
          this.detalheFood[0]['translateAttr'] = newAtrribute;

        },
        error => {
          error == 500 && this.alerts.push({ message: 'Listagem indisponível', color: 'alert-danger' });
          error == 404 && this.alerts.push({ message: 'Nenhuma informação por aqui', color: 'alert-warning' });
        });
  }
}
