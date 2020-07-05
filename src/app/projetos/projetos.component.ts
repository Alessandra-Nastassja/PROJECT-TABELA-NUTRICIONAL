import { Component, OnInit, Input } from '@angular/core';

import { AppService } from './../app.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
  providers: [AppService]
})
export class ProjetosComponent implements OnInit {

  categorias = []
  comidas = []
  filterCategoriaComida = [];
  idItem: any;
  idProduto = '';

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getFood();
    this.getCategorie();
  }

  // Carrega o feed com todas as comidas
  getFood() {
    this.appService.getFood().subscribe(
      success => {
        this.comidas = success;
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
  }

}