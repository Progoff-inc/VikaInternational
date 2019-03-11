import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../booking/booking.component';
import { GoodsService } from '../services/products.service';

@Component({
  selector: 'booking-cart',
  templateUrl: './booking-cart.component.html',
  styleUrls: ['./booking-cart.component.less']
})
export class BookingCartComponent implements OnInit {
  @Input() parent;
  constructor(public gs:GoodsService) { }

  ngOnInit() {
  }

}
