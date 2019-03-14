import { Component, OnInit } from '@angular/core';
import { UserService, Deal } from '../services/user.service';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';
import { GoodsService } from '../services/products.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {

  constructor(public us:UserService, private ms:ModalService, private gs:GoodsService) {
      if(!this.us.user){
        this.showModal();
      }
  }

  ngOnInit() {
    console.log(this.us.user.Deals[0].Goods[0].Count)

  }
  showModal(){
    window.history.back();
  }
  LogOut(){
    this.us.logOut();
  }

  showGoods(d){
    d.ShowGoods = !d.ShowGoods; 
  }
  

}
