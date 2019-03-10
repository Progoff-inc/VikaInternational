import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  showC=false;
  constructor(public gs:GoodsService) { }

  ngOnInit() {
  }
  showCart(){
    if(this.gs.cart.length>0){
      
      this.showC = !this.showC
    }
    else{
      this.showC = false;
    }
  }
  hideCart(){
    this.showC = false;
  }

}
