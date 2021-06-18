import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { environment } from '../../environments/environment';

import { AppService } from './../app.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [AppService]
})
export class ModalComponent implements OnInit, OnChanges {

  loading = {
    detalheItem: true
  }

  @Input() idProduto = []
  objectNameTranslate: any = []
  infoComida = []
  translate = []

  constructor(private appService: AppService) { }

  ngOnInit() {    
  }

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
        error == 500 && 'Item indisponível';
        error == 404 && 'Nenhuma informação por aqui';
      });
  }

}
