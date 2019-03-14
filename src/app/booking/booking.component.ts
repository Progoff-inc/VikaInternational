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

  constructor() { }

  ngOnInit() {
    this.vm = this;
    this.curStep = 0;
  }
  nextStep(){
    this.curStep++;
  }

}

export class Book{
  Cart:CartItem[] = [];
  User:BookingUser;
  DeliverType:DeliverTypes;
  PayType:PayTypes

  plus(g){
    let i = this.Cart.find(x => x.Good.GoodId==g.Good.GoodId);
    i.Count++;
    sessionStorage.setItem('Cart',JSON.stringify(this.Cart));
  }
  minus(g){
    let i = this.Cart.find(x => x.Good.GoodId==g.Good.GoodId);
    i.Count--;
    sessionStorage.setItem('Cart',JSON.stringify(this.Cart));
    
  }
}

export class BookingUser{
  Name:string;
  Email:string;
  Phone:string;
}

export enum DeliverTypes{
  Pickup = "pickup", 
  Delivery = "delivery"
}

export enum PayTypes{
  Cash = "cash", 
  Card = "card"
}