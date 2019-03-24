import { Component, OnInit, Input } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { Section, NewGood, UploadTypes } from '../services/models';
import { HttpEventType } from '@angular/common/http';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'update-section',
  templateUrl: './update-section.component.html',
  styleUrls: ['./update-section.component.less']
})
export class UpdateSectionComponent implements OnInit {
  @Input() section:Section;
  @Input() save:Function;
  sectionCopy:Section;
  goods:NewGood[] = [];
  
  image:File;
  invalidImage = false;
  goodsImageInvalids:boolean[] = [];
  sGoodsImageInvalids:boolean[] = [];
  goodsFiles:File[] = [];
  sGoodsFiles:File[] = [];
  constructor(private gs:GoodsService, private ls:LoadService) { }

  ngOnInit() {
    this.sectionCopy = JSON.parse(JSON.stringify(this.section));
    this.section.Goods.forEach(()=>{
      this.sGoodsImageInvalids.push(false);
      this.sGoodsFiles.push(null);
    })
  }
  checkChanges(){
    return !this.deepEqual(this.section,this.sectionCopy);
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
  addGood(){
    if(this.goods.length==0 || this.checkGood(this.goods[this.goods.length-1])){
      this.goods.push({
        SectionId:this.section.SectionId,
        Name:'',
        Description:'',
        Price:null,
        Color:''
      })
      this.goodsFiles.push(null);
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

  putFile(event, type='section', i?){
    console.log(event.target.files);
    if(event.target.files[0].type=='image/jpeg'){
      if(type=='section'){
        this.image = <File>event.target.files[0];
        
        this.invalidImage = false;
      }
      else if(type=='section-good'){
        
        this.sGoodsFiles[i]=<File>event.target.files[0];
        this.sGoodsImageInvalids[i]=false;
      }
      else{
        console.log(111)
        this.goodsFiles[i]=<File>event.target.files[0];
        console.log( this.goodsFiles[i])
        this.goodsImageInvalids[i]=false;
      }
      
    }else{
      if(type=='section'){
        this.invalidImage = true;
      }
      else if(type='section-good'){
        this.sGoodsImageInvalids[i]=true;
      }
      else{
        this.goodsImageInvalids[i]=true;
      }
    }

    
  }
  unload(type='section', i?){
    if(type=='section'){
      this.image = null;
    }
    else if(type='section-good'){
      this.sGoodsFiles[i]=null;
    }
    else{
      this.goodsFiles[i]=null;
    }
  }
  unloadLink(s){
    s.Image = null;
  }
  getUrl(f:File){
    return URL.createObjectURL(f).split('blob:')[1];
  }

}
