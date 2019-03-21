import { Component, OnInit } from '@angular/core';
import { CartItem } from '../services/models';
import { GoodsService } from '../services/products.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.less']
})
export class BookingComponent implements OnInit {
  curStep:number;
  vm:any;

  constructor(public gs:GoodsService) { }

  ngOnInit() {
    this.vm = this;
    this.curStep = 0;
  }
  nextStep(){
    this.curStep++;
  }
}