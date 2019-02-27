import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../products.service';
import { Good } from '../goods/goods.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

  constructor(private gs:GoodsService, private route:ActivatedRoute) { }
  good:Good;
  ngOnInit() {
    this.good = this.gs.getProduct(this.route.snapshot.paramMap.get("id"))
    console.log(this.good);
  }
  choosePhoto(p){
    this.good.Image = p;
  }

}
