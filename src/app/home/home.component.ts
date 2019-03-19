import { Component, OnInit } from '@angular/core';
import { Section } from '../services/models';
import { GoodsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  sections:Section[]
  
  constructor( private gs:GoodsService) { }

  ngOnInit() {
    this.gs.getSections().subscribe(data => {
      this.sections = data;
    })
  }
}


