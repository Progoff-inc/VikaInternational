import { Component, OnInit, Input } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'booking-success',
  templateUrl: './booking-success.component.html',
  styleUrls: ['./booking-success.component.less']
})
export class BookingSuccessComponent implements OnInit {
  constructor(public gs:GoodsService,private router:Router,private us:UserService, private ls:LoadService) { }

  ngOnInit() {
    this.ls.showLoad=false;
  }

  goHome(){
    this.router.navigate(['']);
  }
  goToProfile(){
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
  ngOnDestroy(){
    console.log("Активный объект:")
    console.log(this.gs.book);
    delete this.gs.bookId;
    delete this.gs.book.Country;
    delete this.gs.book.City;
    delete this.gs.book.Address;
    delete this.gs.book.PostIndex;
    delete this.gs.book.DeliverType;
    delete this.gs.book.PayType;
    console.log("Объект по закрытию компонета:")
    console.log(this.gs.book);
  }
}
