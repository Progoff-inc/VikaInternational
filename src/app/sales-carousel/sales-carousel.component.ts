import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { Sale, GoodTypes } from '../services/models';

@Component({
  selector: 'sales-carousel',
  templateUrl: './sales-carousel.component.html',
  styleUrls: ['./sales-carousel.component.less']
})
export class SalesCarouselComponent implements OnInit {
  sales:Sale[];
  constructor(private gs:GoodsService) { }

  ngOnInit() {
    this.gs.getSales().subscribe(data => {
      this.sales = data;
    })
  }
  addSale(s){
    this.gs.addCartProduct(s, GoodTypes.Sale);
  }
}
