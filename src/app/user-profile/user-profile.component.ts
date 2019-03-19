import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
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
      if(!localStorage.getItem('user') && !sessionStorage.getItem('user')){
        this.showModal();
      }
  }

  ngOnInit() {

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
  changeInfo(){
    let change = {
      UserId:this.us.user.UserId,
      Email:this.us.user.Email,
      Phone:this.us.user.Phone
    }
    this.ms.open("change", change);
  }

}
