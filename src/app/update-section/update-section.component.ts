import { Component, OnInit, Input } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { Section, NewGood, UploadTypes } from '../services/models';
import { HttpEventType } from '@angular/common/http';
import { LoadService } from '../services/load.service';
import { UpdateSectionsComponent } from '../update-sections/update-sections.component';

@Component({
  selector: 'update-section',
  templateUrl: './update-section.component.html',
  styleUrls: ['./update-section.component.less']
})
export class UpdateSectionComponent implements OnInit {
  @Input() section:Section;
  @Input() parent:UpdateSectionsComponent;
  sectionCopy:Section;
  goods:NewGood[] = [];
  
  image:File;
  invalidImage = false;
  goodsImageInvalids:boolean[] = [];
  sGoodsImageInvalids:boolean[] = [];
  goodsFiles:File[] = [];
  sGoodsFiles:File[] = [];
  goodsLoadCount:number;
  sGoodsLoadCount:number;
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

  saveChanges(){
    if(this.section.Name=='' || (!this.section.Image && !this.image) || this.invalidImage){
      return;
    }
    for(let i = 0; i<this.section.Goods.length; i++){
      if(!this.checkGood(this.section.Goods[i], i, this.sGoodsFiles)){
        return;
      }
    }
    for(let i = 0; i<this.goods.length; i++){
      if(!this.checkGood(this.goods[i], i, this.goodsFiles)){
        return;
      }
    }
    for(let i = 0; i< this.goodsImageInvalids.length; i++){
      if(this.goodsImageInvalids[i]){
        return
      }
    }
    for(let i = 0; i< this.sGoodsImageInvalids.length; i++){
      if(this.sGoodsImageInvalids[i]){
        return
      }
    }
    this.ls.showLoad=true;
    this.sGoodsLoadCount = this.sGoodsFiles.filter(f => f).length;
    this.goodsLoadCount = this.goodsFiles.filter(f => f).length;
    this.gs.updateSection({Name:this.section.Name}, this.section.SectionId).subscribe(()=> {
      this.sectionCopy.Name = this.section.Name;
      if(this.image){
        let formData = new FormData();
        formData.append('Data', this.image);
        this.gs.UploadFile(this.section.SectionId, UploadTypes.Section, formData).subscribe(event => {
          if(event.type == HttpEventType.UploadProgress){
            this.ls.load = Math.round(event.loaded/event.total * 100);
            
          }
          else if(event.type == HttpEventType.Response){
            this.section.Image=event.body[0];
            this.sectionCopy.Image=event.body[0];
            if(this.goodsLoadCount==0 && this.sGoodsLoadCount==0){
              this.ls.load = -1;
              this.ls.showLoad=false;
              this.parent.hide();
            }
          }
        })
      }
      this.gs.updateSectionGoods(this.section.Goods).subscribe(()=>{
        
        if(this.sGoodsLoadCount>0){
          for(let i = 0; i<this.sGoodsFiles.length; i++){
            if(this.sGoodsFiles[i]){
              let formData = new FormData();
              formData.append('Data', this.sGoodsFiles[i]);
              this.gs.UploadFile(this.section.Goods[i].GoodId, UploadTypes.Good, formData).subscribe(event => {
                if(event.type == HttpEventType.UploadProgress){
                  this.ls.load = Math.round(event.loaded/event.total * 100);
                  
                }
                else if(event.type == HttpEventType.Response){
                  this.section.Goods[i].Image=event.body[0];
                  this.sectionCopy.Goods[i]=JSON.parse(JSON.stringify(this.section.Goods[i]));
                  this.sGoodsLoadCount--;
                  if(this.goodsLoadCount==0 && this.sGoodsLoadCount==0){
                    this.ls.load = -1;
                    this.ls.showLoad=false;
                    this.parent.hide();
                  }
                  
                }
              })
            }else{
              this.sectionCopy.Goods[i]=JSON.parse(JSON.stringify(this.section.Goods[i]));
            }
          }
        }else{
          this.sectionCopy.Goods=JSON.parse(JSON.stringify(this.section.Goods));
          if(this.goodsLoadCount==0 && this.sGoodsLoadCount==0){
            this.ls.load = -1;
            this.ls.showLoad=false;
          }
        }
      })
    })
    if(this.goods.length>0){
      this.gs.addGoods(this.goods).subscribe(gds => {
        if(this.goodsLoadCount>0){
          for(let i = 0; i<gds.length; i++){
            console.log(this.goodsFiles);
            if(this.goodsFiles[i]){
              let formData = new FormData();
              formData.append('Data', this.goodsFiles[i]);
              this.gs.UploadFile(gds[i].GoodId, UploadTypes.Good, formData).subscribe(event => {
                if(event.type == HttpEventType.UploadProgress){
                  this.ls.load = Math.round(event.loaded/event.total * 100);
                  
                }
                else if(event.type == HttpEventType.Response){
                  gds[i].Image=event.body[0];
                  console.log(gds[i]);
                  this.section.Goods.push(gds[i]);
                  this.sectionCopy.Goods.push(gds[i]);
                  this.goodsLoadCount--;
                  if(this.goodsLoadCount==0 && this.sGoodsLoadCount==0){
                    this.ls.load = -1;
                    this.ls.showLoad=false;
                    this.parent.hide();
                  }
                  
                }
              })
            }
          }
        }
        
      })
    }else{
      if(this.goodsLoadCount==0 && this.sGoodsLoadCount==0){
        this.ls.load = -1;
        this.ls.showLoad=false;
      }
    }
    
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
    if(this.goods.length==0 || this.checkGood(this.goods[this.goods.length-1]) || !this.goodsFiles[this.goods.length-1]){
      this.goods.push({
        SectionId:this.section.SectionId,
        Name:'',
        Description:'',
        Price:null,
        Color:''
      })
      this.goodsFiles.push(null);
      this.goodsImageInvalids.push(false);
    }
    

  }
  checkGood(g, i?, files?){
    let res = true;
    for(let j = 0; j<Object.keys(g).length; j++){
      let k = Object.keys(g)[j];
      if((g[k]=='' || !g[k])&&k!='SectionId'){
        if(k == 'Image' && files[i]){
          continue
        }
        else{
          res=false;
          break;
        }
      }
    };
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

  remove(id, i){
    this.gs.removeGood(id).subscribe(d => {
      this.sectionCopy.Goods.splice(i,1);
      this.section.Goods.splice(i,1);
      this.sGoodsFiles.splice(i,1);
      this.sGoodsImageInvalids.splice(i,1);
    })
  }

  removeNew(i){
      this.goods.splice(i,1);
      this.goodsFiles.splice(i,1);
      this.goodsImageInvalids.splice(i,1);
  }

}
