import { Component, OnInit } from '@angular/core';
import { Section, NewGood } from '../services/models';
import { GoodsService } from '../services/products.service';
import { deepEqual } from 'assert';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'update-sections',
  templateUrl: './update-sections.component.html',
  styleUrls: ['./update-sections.component.less']
})
export class UpdateSectionsComponent implements OnInit {
  sections:Section[] = [];
  curSection:Section;
  curIndex = null;
  vm:UpdateSectionsComponent;
  
  constructor(private gs:GoodsService, private ls:LoadService) { }

  ngOnInit() {
    this.ls.showLoad=true;
    this.gs.getAdminSections().subscribe(data => {
      this.sections = data;
      this.ls.showLoad=false;
    })
    this.vm=this;
    
  }
  change(s:Section, i){
    this.curSection=s;
    this.curIndex = i;
  }
  remove(id, i){
    this.ls.showLoad=true;
    this.gs.removeSection(id).subscribe(d => {
      if(d){
        if(this.curIndex==i){
          this.curSection = null;
        }
        this.sections.splice(i,1);
        
      }else{
        throw new Error("Отказано в доступе");
      }
      this.ls.showLoad=false;
      
    })
  }
  hide(){
    this.curSection=null;
    this.curIndex=null;
  }

  
}
