import { Component, OnInit, Input } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.less']
})
export class BookingSuccessComponent implements OnInit {
  constructor(public gs:GoodsService,private router:Router,private us:UserService) { }

  ngOnInit() {
  }

  goHome(){
    this.clearBook();
    this.router.navigate(['']);
  }
  goToProfile(){
    this.clearBook();
    this.router.navigate(['user-profile']);
  }
  clearBook(){
    delete this.gs.bookId;
    delete this.gs.book.Country;
    delete this.gs.book.City;
    delete this.gs.book.Address;
    delete this.gs.book.PostIndex;
    delete this.gs.book.DeliverType;
    delete this.gs.book.PayType;
  }
}
