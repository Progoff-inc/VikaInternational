import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../booking/booking.component';
import { GoodsService } from '../services/products.service';

@Component({
  selector: 'booking-contact-info',
  templateUrl: './booking-contact-info.component.html',
  styleUrls: ['./booking-contact-info.component.less']
})
export class BookingContactInfoComponent implements OnInit {
  @Input() parent;
  constructor(public gs:GoodsService) { }

  ngOnInit() {
  }

}
