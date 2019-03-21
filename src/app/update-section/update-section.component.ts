import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { Section, NewGood } from '../services/models';

@Component({
  selector: 'update-section',
  templateUrl: './update-section.component.html',
  styleUrls: ['./update-section.component.less']
})
export class UpdateSectionComponent implements OnInit {
  sections:Section[];
  goods = [];
  sectionsCopy:Section[];
  submits:boolean[] = [];
  sGoods:boolean[] = [];
  constructor(private gs:GoodsService) { }

  ngOnInit() {
    this.gs.getAdminSections().subscribe(data => {
      this.sections = data;
      data.forEach(x => {
        this.submits.push(false);
        this.sGoods.push(false);
        this.goods.push([]);
      })
      this.sectionsCopy = JSON.parse(JSON.stringify(data));
    })
  }
  showGoods(i){

    this.sGoods[i]=!this.sGoods[i];
  }
  checkChanges(s:Section){
    let s1 = this.sectionsCopy.find(se => se.SectionId==s.SectionId);
    return !this.deepEqual(s,s1);
  }
  saveChanges(s:Section, i){
    this.submits[i]=true;
    for(let j = 0; j<this.goods[i].length; j++){
      if(!this.checkGood(this.goods[i][j])){
        return
      }
    }
    
    this.gs.updateSection({Name:s.Name, Image:s.Image}, s.SectionId).subscribe((d)=>{
      console.log(d);
      this.gs.updateSectionGoods(s.Goods).subscribe(()=> {
        if(this.goods[i].length>0){
          this.gs.addGoods(this.goods[i]).subscribe(data=> {
            console.log(data);
            this.goods[i] = [];
            this.submits[i] = false;
            var ss = this.sectionsCopy.find(se => se.SectionId==s.SectionId);
            ss.Name = s.Name;
            ss.Image = s.Image;
            data.forEach(e => {
              ss.Goods.push(e);
              s.Goods.push(e);
            });
          });
          
        }
        else{
          this.submits[i] = false;
            var ss = this.sectionsCopy.find(se => se.SectionId==s.SectionId);
            ss.Name = s.Name;
            ss.Image = s.Image;
            ss.Goods = JSON.parse(JSON.stringify(s.Goods));
        }
        
      })
      
    });
  }

  
  deepEqual(a, b) {
    if (a === b) {
        return true;
    }
 
    if (a == null || typeof(a) != "object" ||
        b == null || typeof(b) != "object")
    {
        return false;
    }
 
    var propertiesInA = 0, propertiesInB = 0;
    for (var property in a) {
        propertiesInA += 1;
    }
    for (var property in b) {
        propertiesInB += 1;
        if (!(property in a) || !this.deepEqual(a[property], b[property])) {
          
            return false;        
        }
    }
    return propertiesInA == propertiesInB;
  }
  addGood(sid,i){
    console.log(sid);
    if(this.goods[i].length==0 || this.checkGood(this.goods[i][this.goods[i].length-1])){
      this.goods[i].push({
        SectionId:sid,
        Name:'',
        Description:'',
        Price:null,
        Color:'',
        Image:''
      })
    }
    

  }
  checkGood(g){
    let res = true;
    Object.keys(g).forEach(k => {
      
      if((g[k]=='' || !g[k])&&k!='SectionId'){
        console.log(k);
        res = false;
        
      }
    })
    return res;
  }

}
