import { Component, OnInit, Input } from '@angular/core';
import { GoodsService } from '../services/products.service';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.less']
})
export class ProgressBarComponent implements OnInit {
  @Input() parent;
  steps = [1,2,3,4,5];
  constructor(public gs:GoodsService) { }

  ngOnInit() {
  }
  
  chStep(i){
    if(this.gs.bookId==null&&i==0){
      this.parent.curStep=i;
    }
    if(this.gs.bookId==null&&this.gs.book.User&&i==1){
      this.parent.curStep=i;
    }
    if(this.gs.bookId==null&&this.gs.book.DeliverType&&this.gs.book.PayType&&i==2){
      this.parent.curStep=i;
    }
    if(this.gs.bookId==null&&this.gs.book.User&&this.gs.book.DeliverType&&this.gs.book.PayType&&i==3){
      this.parent.curStep=i;
    }
    if(this.gs.bookId!=null&&i==4){
      this.parent.curStep=i;
    }
  }
  comp(i){
    if(this.gs.bookId==null&&i==0){
      return true;
    }
    if(this.gs.bookId==null&&this.gs.book.User&&i==1){
      return true;
    }
    if(this.gs.bookId==null&&this.gs.book.DeliverType&&this.gs.book.PayType&&i==2){
      return true;
    }
    if(this.gs.bookId==null&&this.gs.book.Cart&&this.gs.book.User&&this.gs.book.DeliverType&&this.gs.book.PayType&&i==3){
      return true;
    }
  }
}
