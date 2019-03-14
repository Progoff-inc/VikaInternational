import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../services/products.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.less']
})
export class GoodsComponent implements OnInit {
  
  
  constructor(public gs:GoodsService) { }

  ngOnInit() {
  }

}
