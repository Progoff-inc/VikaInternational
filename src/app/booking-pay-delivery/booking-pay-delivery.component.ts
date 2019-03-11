import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../booking/booking.component';
import { GoodsService } from '../services/products.service';

@Component({
  selector: 'booking-pay-delivery',
  templateUrl: './booking-pay-delivery.component.html',
  styleUrls: ['./booking-pay-delivery.component.less']
})
export class BookingPayDeliveryComponent implements OnInit {
  @Input() parent;
  constructor(public gs:GoodsService) { }

  ngOnInit() {
  }

}
