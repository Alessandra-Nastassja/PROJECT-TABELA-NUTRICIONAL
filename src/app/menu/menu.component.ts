import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { environment } from '../../environments/environment';

import { AppService } from './../app.service';
import 'rxjs/add/operator/finally';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [AppService]
})
export class MenuComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
    
  }

}
