import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  showC=false;
  constructor(public gs:GoodsService, public ms:ModalService, private router:Router) { }

  ngOnInit() {
  }
  showCart(){
    if(this.gs.book.Cart.length>0){
      
      this.showC = !this.showC
    }
    else{
      this.showC = false;
    }
  }
  hideCart(){
    this.showC = false;
  }
  Profile(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/user-profile']);
    }else{
      this.ms.open('enter');
    }
  }

}
