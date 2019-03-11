import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../booking/booking.component';
import { GoodsService } from '../services/products.service';

@Component({
  selector: 'booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.less']
})
export class BookingSuccessComponent implements OnInit {
  constructor(public gs:GoodsService) { }

  ngOnInit() {
  }

}
