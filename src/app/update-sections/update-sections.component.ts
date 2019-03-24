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
  curIndex = null;
  vm:UpdateSectionsComponent;
  
  constructor(private gs:GoodsService) { }

  ngOnInit() {
    this.gs.getAdminSections().subscribe(data => {
      this.sections = data;
    })
    this.vm=this;
    
  }
  change(s:Section, i){
    this.curSection=s;
    this.curIndex = i;
  }
  remove(id, i){
    this.gs.removeSection(id).subscribe(d => {
      if(this.curIndex==i){
        this.curSection = null;
      }
      this.sections.splice(i,1);
    })
  }
  hide(){
    this.curSection=null;
    this.curIndex=null;
  }

  
}
