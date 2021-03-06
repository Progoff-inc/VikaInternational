import { Component, OnInit } from '@angular/core';
import { Section, Sale } from '../services/models';
import { GoodsService } from '../services/products.service';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  sections:Section[]
  sales:Sale[];
  constructor( private gs:GoodsService, private ls:LoadService) { }

  ngOnInit() {
    this.ls.showLoad=true;
    this.gs.getSections().subscribe(data => {
      this.sections = data;
      this.ls.showLoad=false;
    })
    
  }
}


