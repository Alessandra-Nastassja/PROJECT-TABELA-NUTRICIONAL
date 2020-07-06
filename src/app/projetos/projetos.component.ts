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
  isLoading = true;
  querySearch = '';
  showSuggestions: boolean;
  productId: any;

  product = {
    filteredProducts: []
  }

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getFood();
    this.getCategorie();
  }

  // Carrega o feed com todas as comidas
  getFood() {
    this.appService.getFood().subscribe(
      success => {
        setTimeout(() => {
          this.comidas = success;

          this.isLoading = false;
        }, 1000);
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
        this.categorias = success;
      }
    );
  }

  getInfoProduto(_idProduto) {
    this.idProduto = _idProduto.target.id;
  }

  setProductId(_productId = ''){
   this.productId = _productId;

   console.log('setProductId: ', this.productId);

   this.appService.getFoodById(this.productId)
   .subscribe(
     success => {
       this.comidas = success;
     }
   )
  }

  setFilteredProducts(_event){
    let search;

    if(_event.target == undefined){
      search = _event.toLowerCase();
    }else{
      search = _event.target.value.toLowerCase();
    }

    if(!search){
      this.setProductId();
      return;
    }

    // Elimita acentos e caracteres especiais;
    search = search.replace(/[ÀÁÂÃÄÅ]/g, "A");
    search = search.replace(/[àáâãäå]/g, "a");
    search = search.replace(/[ÈÉÊË]/g, "E");
    search = search.replace(/[^a-z0-9]/gi,'');

    this.showSuggestions = true;
    this.product.filteredProducts = this.comidas.filter(e => e.description.toLowerCase().includes(search));

    console.log('setFilteredProducts: ', this.product.filteredProducts);
  }
}