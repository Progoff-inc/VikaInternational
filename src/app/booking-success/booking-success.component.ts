import { Component, OnInit, Input } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.less']
})
export class BookingSuccessComponent implements OnInit {
  constructor(public gs:GoodsService,private router:Router) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigate(['']);
  }
}
