import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { Section } from '../services/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.less']
})
export class GoodsComponent implements OnInit {
  section:Section;
  
  constructor(public gs:GoodsService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.gs.getSection(this.route.snapshot.paramMap.get("id")).subscribe(data => {
      this.section = data;
    })
  }

}
