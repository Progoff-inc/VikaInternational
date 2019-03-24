import { Component, OnInit } from '@angular/core';
import { Section, NewGood } from '../services/models';
import { GoodsService } from '../services/products.service';
import { deepEqual } from 'assert';

@Component({
  selector: 'update-sections',
  templateUrl: './update-sections.component.html',
  styleUrls: ['./update-sections.component.less']
})
export class UpdateSectionsComponent implements OnInit {
  sections:Section[];
  curSection:Section;
  vm:UpdateSectionsComponent;
  
  constructor(private gs:GoodsService) { }

  ngOnInit() {
    this.gs.getAdminSections().subscribe(data => {
      this.sections = data;
    })
    this.vm=this;
    
  }
  change(s:Section){
    this.curSection=s;
    
  }
  remove(id:any){
    confirm(id);
  }
  hide(){
    this.curSection=null;
  }

  
}
