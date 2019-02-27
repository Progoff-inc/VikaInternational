import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../products.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.less']
})
export class GoodsComponent implements OnInit {
  
  
  constructor(private gs:GoodsService) { }

  ngOnInit() {
  }

}

export interface Good{
  Id:number;
  Name:string;
  Description:string;
  Price:number;
  Image:string;
  Photoes?:string[];
}
