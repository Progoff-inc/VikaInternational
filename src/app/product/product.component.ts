import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { Good } from '../services/models';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

  constructor(public gs:GoodsService, private route:ActivatedRoute, private location:Location, private ls:LoadService) { }
  good:Good;
  ngOnInit() {
    this.ls.showLoad=true;
    this.gs.getProduct(this.route.snapshot.paramMap.get("id")).subscribe(data => {
      this.good = data;
      this.ls.showLoad=false;
    })
  }
  choosePhoto(p){
    this.good.Image = p;
  }
  goBack(){
    this.location.back();
  }
}
