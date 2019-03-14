import { Component, OnInit, Input } from '@angular/core';
import { GoodsService } from '../services/products.service';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.less']
})
export class CounterComponent implements OnInit {
  @Input("Count") g:any;
  @Input("Item") i:any;
  constructor(private gs:GoodsService) { }

  ngOnInit() {
  }
  

}
