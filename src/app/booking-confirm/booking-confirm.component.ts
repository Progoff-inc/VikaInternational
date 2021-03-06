import { Component, OnInit, Input } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { UserService } from '../services/user.service';
import { NewDeal, User, NewUser, GoodTypes } from '../services/models';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'booking-confirm',
  templateUrl: './booking-confirm.component.html',
  styleUrls: ['./booking-confirm.component.less']
})
export class BookingConfirmComponent implements OnInit {
  @Input() parent;
  constructor(public gs:GoodsService, private us:UserService, private ls:LoadService) { }

  ngOnInit() {
  }
  chContact(){
    this.parent.curStep=1;
  }
  chPayDel(){
    this.parent.curStep=2;
  }
  addDeal(id){
    let deal:NewDeal={
      UserId:id,
      Country:this.gs.book.Country,
      City:this.gs.book.City,
      Address:this.gs.book.Address,
      PostIndex:this.gs.book.PostIndex,
      PayType:this.gs.book.PayType,
      DeliverType:this.gs.book.DeliverType
    }
    this.ls.showLoad=true;
    this.gs.addDeal(deal).subscribe(dealId=>{
      this.gs.bookId=dealId;
      let cart =[];
      this.gs.book.Cart.forEach(c=>{
        cart.push({
          DealId:dealId,
          GoodId:c.Type==GoodTypes.Good?c.Good.GoodId:c.Good.SaleId,
          Count:c.Count,
          Type:c.Type
        })
      })
      this.gs.addDealGoods(cart).subscribe((d)=>{
        this.gs.clearCart(false);
        this.parent.nextStep();
      });
    })
  }
  completeDeal(){
    if(this.us.user){
      this.addDeal(this.us.user.UserId)
    }
    else{
      let user:NewUser={
        Name:this.gs.book.User.Name,
        Email:this.gs.book.User.Email,
        Phone:this.gs.book.User.Phone,
        Password:this.us.GenPassword()
      }
      this.ls.showLoad=true;
      this.us.regUser(user).subscribe(user=>{
        this.us.user=user[0];
        this.us.setToken(user[1]);
        this.gs.book.User = {Name:user[0].Name, Email:user[0].Email, Phone:user[0].Phone};
        this.addDeal(user[0].UserId);
      })
    }
  }
}
