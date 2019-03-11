import { Component, OnInit, Input } from '@angular/core';
import { GoodsService } from '../services/products.service';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.less']
})
export class CounterComponent implements OnInit {
  @Input("Count") g:any;
  constructor(private gs:GoodsService) { }

  ngOnInit() {
  }
  plus(){
    
    this.g.Count+=1;
    console.log(this.gs.cart[0].Count);
  }
  minus(){
    this.g.Count-=1;
  }

}
