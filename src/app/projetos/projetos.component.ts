import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
  providers: [AppService]
})
export class ProjetosComponent implements OnInit {

  translate = []
  categorias = []
  infoComida = []
  comidas = []
  filterCategoriaComida = [];
  idItem: any;
  idProduto: [];
  objectNameTranslate: any = []

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getFood();
    this.getCategorie();
  }

  // Carrega o feed com todas as comidas
  getFood() {
    this.appService.getFood().subscribe(
      success => {
        this.comidas = success
        // console.log(this.comidas);
      }
    );
  }

  // Pega o id do produto
  getIdProduto(event) {
    this.idItem = event.target.id;

    this.getFilterCategorie(this.idItem);
  }

  // Realiza o filtro de comida pela categoria
  getFilterCategorie(event) {
    this.appService.getFilterCategories(event).subscribe(
      success => {
        this.comidas = success
        // console.log(this.comidas);
      }
    );
  }

  // Carrega o menu com todas as categorias
  getCategorie() {
    this.appService.getCategories().subscribe(
      success => {
        this.categorias = success
        // console.log(this.categorias);
      }
    );
  }

  getInfoProduto(_idProduto) {
    this.idProduto = _idProduto.target.id;

    this.appService.getFoodById(this.idProduto).subscribe(
      success => {
        this.infoComida = success
        this.translate = this.infoComida[0].attributes
        let objectName = (Object.keys(this.translate))


        objectName.forEach(e => {
          switch (e) {
            case 'calcium':
              this.objectNameTranslate.push('cálcio')
              break;
            case 'protein':
              this.objectNameTranslate.push('proteína')
              break;
            case 'potassium':
              this.objectNameTranslate.push('potássio')
              break;
            case 'manganese':
              this.objectNameTranslate.push('manganês')
              break;
            case 'phosphorus':
              this.objectNameTranslate.push('fósforo')
              break;
            default:
              break;
          }
        })

        console.log(this.objectNameTranslate);
        
        
      });
  }

}