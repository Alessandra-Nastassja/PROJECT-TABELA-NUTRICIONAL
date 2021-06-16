import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [AppService]
})
export class MenuComponent implements OnInit {

  categorias = [];
  showSuggestions: boolean;
  comidas = []

  product = {
    filteredProducts: []
  }

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getCategorie();
  }

  // Carrega o menu com todas as categorias
  getCategorie() {
    this.appService.getCategories().subscribe(
      success => {
        this.categorias = success;
      }
    );
  }

  setFilteredProducts(_event) {
    let search;

    if (_event.target == undefined) {
      search = _event.toLowerCase();
    } else {
      search = _event.target.value.toLowerCase();
    }

    // if (!search) {
    //   this.setProductId();
    //   return;
    // }

    // Elimita acentos e caracteres especiais;
    search = search.replace(/[ÀÁÂÃÄÅ]/g, "A");
    search = search.replace(/[àáâãäå]/g, "a");
    search = search.replace(/[ÈÉÊË]/g, "E");
    search = search.replace(/[^a-z0-9]/gi, '');

    this.showSuggestions = true;
    this.product.filteredProducts = this.comidas.filter(e => e.description.toLowerCase().includes(search));

    console.log('setFilteredProducts: ', this.product.filteredProducts);
  }

}
