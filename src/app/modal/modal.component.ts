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

  // FIXME: so, try think another thing
  objectNameTranslate: any = []
  infoComida = []
  translate = []

  constructor(private appService: AppService) { }

  ngOnChanges(){
    this.idProduto && this.getInfoProdutos();
  }

  getInfoProdutos(){
    const endpoint = `${environment.tacoFoods}/food/`;

    this.appService.getFoodById(endpoint, this.idProduto)
    .finally(() => this.loading.detalheItem = false)
    .subscribe(
      success => {
        this.infoComida = success;
        this.translate = this.infoComida[0].attributes
        let objectName = (Object.keys(this.translate))


        objectName.forEach(e => {
          switch (e) {
            case 'calcium':
              this.objectNameTranslate.push('Cálcio')
              break;
            case 'protein':
              this.objectNameTranslate.push('Proteína')
              break;
            case 'potassium':
              this.objectNameTranslate.push('Potássio')
              break;
            case 'manganese':
              this.objectNameTranslate.push('Manganês')
              break;
            case 'phosphorus':
              this.objectNameTranslate.push('Fósforo')
              break;
            default:
              break;
          }
        })
      },
      error => {
        error == 500 && this.alerts.push({message: 'Listagem indisponível', color: 'alert-danger'});
        error == 404 && this.alerts.push({message: 'Nenhuma informação por aqui', color: 'alert-warning'});
      });
  }
}
