import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { Good } from '../services/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

  constructor(public gs:GoodsService, private route:ActivatedRoute) { }
  good:Good;
  ngOnInit() {
    this.gs.getProduct(this.route.snapshot.paramMap.get("id")).subscribe(data => {
      this.good = data;
    })
  }
  choosePhoto(p){
    this.good.Image = p;
  }

}
