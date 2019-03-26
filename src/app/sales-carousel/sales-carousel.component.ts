import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { Sale, GoodTypes } from '../services/models';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'sales-carousel',
  templateUrl: './sales-carousel.component.html',
  styleUrls: ['./sales-carousel.component.less']
})
export class SalesCarouselComponent implements OnInit {
  sales:Sale[];
  constructor(private gs:GoodsService, private ls:LoadService) { }

  ngOnInit() {
    this.ls.showLoad=true;
    this.gs.getSales().subscribe(data => {
      this.sales = data;
      this.ls.showLoad=false;
    })
  }
  addSale(s){
    this.gs.addCartProduct(s, GoodTypes.Sale);
  }
}
