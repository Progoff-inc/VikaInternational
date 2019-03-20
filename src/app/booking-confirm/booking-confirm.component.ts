import { Component, OnInit, Input } from '@angular/core';
import { GoodsService } from '../services/products.service';

@Component({
  selector: 'booking-confirm',
  templateUrl: './booking-confirm.component.html',
  styleUrls: ['./booking-confirm.component.less']
})
export class BookingConfirmComponent implements OnInit {
  @Input() parent;
  constructor(public gs:GoodsService) { }

  ngOnInit() {
  }

}
