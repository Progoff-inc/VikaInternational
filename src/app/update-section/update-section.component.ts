import { Component, OnInit } from '@angular/core';
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
  sections:Section[];
  goods = [];
  sectionsCopy:Section[];
  submits:boolean[] = [];
  sGoods:boolean[] = [];
  loadGoodsCount = [0,0];
  sectionsFiles:SectionFile[] = [];
  sectionsImageInvalids:SectionImageInvalid[] = [];
  goodsFiles = [];
  constructor(private gs:GoodsService, private ls:LoadService) { }

  ngOnInit() {
    this.gs.getAdminSections().subscribe(data => {
      this.sections = data;
      for(let i = 0;i<data.length; i++) {
        this.submits.push(false);
        this.sGoods.push(false);
        this.goods.push([]);
        this.goodsFiles.push([]);
        
        this.sectionsFiles.push(new SectionFile());
        this.sectionsImageInvalids.push(new SectionImageInvalid());
        data[i].Goods.forEach(g => {
          this.sectionsFiles[i].Goods.push(null);
          this.sectionsImageInvalids[i].Goods.push(false);
        })
      }
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
      var ss = this.sectionsCopy.find(se => se.SectionId==s.SectionId);
      ss.Name = s.Name;
      
      console.log(d);
      if(this.sectionsFiles[i].File){
        let formData = new FormData();
        formData.append('Data', this.sectionsFiles[i].File);
        this.gs.UploadFile(s.SectionId, UploadTypes.Section, formData).subscribe((event)=>{
          if(event.type == HttpEventType.UploadProgress){
            this.ls.load = Math.round(event.loaded/event.total * 100);
            
          }
          else if(event.type == HttpEventType.Response){
            this.sectionsFiles[i].File = null;
            ss.Image =event.body[0];
            s.Image = event.body[0];
          }
        })
        
        
      }
      if(!this.deepEqual(s.Goods, this.sectionsCopy[i].Goods)){
        this.loadGoodsCount[0]=this.sectionsFiles[i].Goods.filter(x => x).length;
        this.gs.updateSectionGoods(s.Goods).subscribe(()=> {
          
          if(this.loadGoodsCount[0]>0){
            for(let j = 0; j<s.Goods.length;j++){
              if(this.sectionsFiles[i].Goods[j]){
                let gFormData = new FormData();
                gFormData.append('Data', this.sectionsFiles[i].Goods[j]);
                this.gs.UploadFile(s.Goods[j].GoodId, UploadTypes.Good, gFormData).subscribe((event)=>{
                  if(event.type == HttpEventType.UploadProgress){
                    console.log(event);
                    this.ls.load = Math.round(event.loaded/event.total * 100);
                    
                  }
                  else if(event.type == HttpEventType.Response){
                    this.loadGoodsCount[0]--;
                    this.ls.load= 0;
                    s.Goods[j].Image=event.body[0];
                    if(this.loadGoodsCount[0]==0){
                      s.Goods.forEach(g => {
                        let sG = ss.Goods.find(s => s.GoodId == g.GoodId);
                        Object.keys(sG).forEach(k => {
                          sG[k]=g[k];
                        })
                      })
                      if(this.loadGoodsCount[1]==0){
                      
                        this.ls.load = -1;
                        this.ls.showLoad=false;
                      }
                    }
                    
                  }
                })
              }
            }
          }
          else if(this.goods[i].length==0){
            ss.Goods = JSON.parse(JSON.stringify(s.Goods));
          }
          
          
          
        })
      }
      if(this.goods[i].length>0){
        this.loadGoodsCount[1]=this.goods[i].length;
        this.gs.addGoods(this.goods[i]).subscribe(data=> {
          console.log(data);
          this.goods[i] = [];
          this.submits[i] = false;
         
          for(let j = 0; j<data.length;j++) {
            let gFormData = new FormData();
            gFormData.append('Data', this.sectionsFiles[i].Goods[j]);
            this.gs.UploadFile(data[j].GoodId, UploadTypes.Good, gFormData).subscribe((event)=>{
              if(event.type == HttpEventType.UploadProgress){
                console.log(event);
                this.ls.load = Math.round(event.loaded/event.total * 100);
                
              }
              else if(event.type == HttpEventType.Response){
                this.loadGoodsCount[1]--;
                this.ls.load= 0;
                data[j].Image=event.body[0];
                if(this.loadGoodsCount[1]==0){
                  this.goods[i]=[];
                  this.goodsFiles[i]=[];
                  data.forEach(d => {
                    ss.Goods.push(d);
                    s.Goods.push(d);
                  })
                  if(this.loadGoodsCount[0]==0){
                    this.ls.load = -1;
                    this.ls.showLoad=false;
                  }
                  
                }
                
              }
              
            })
            
          }
        });
        
      }
      if(this.deepEqual(s.Goods, this.sectionsCopy[i].Goods) && this.goods[i].length==0){
        this.submits[i] = false;
        
        
          var ss = this.sectionsCopy.find(se => se.SectionId==s.SectionId);
          ss.Name = s.Name;
          ss.Image = s.Image;
          ss.Goods = JSON.parse(JSON.stringify(s.Goods));
      }
      
      
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
        Color:''
      })
      this.goodsFiles[i].push(null);
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

  putFile(event, type='section', i, j?){
    console.log(event.target.files);
    if(event.target.files[0].type=='image/jpeg'){
      if(type=='section'){
        this.sectionsFiles[i].File = <File>event.target.files[0];
        this.sectionsImageInvalids[i].Invalid = false;
      }
      else{
        console.log(111)
        this.sectionsFiles[i].Goods[j]=<File>event.target.files[0];
        this.sectionsImageInvalids[i].Goods[j]=false;
      }
      
    }else{
      if(type=='section'){
        this.sectionsImageInvalids[i].Invalid = true;
      }
      else{
        this.sectionsImageInvalids[i].Goods[j]=true;
      }
    }

    
  }
  unload(type='section', i, j?){
    if(type=='section'){
      this.sectionsFiles[i].File = null;
    }
    else{
      this.sectionsFiles[i].Goods[j]=null;
    }
  }
  unloadLink(s){
    s.Image = null;
  }

}

export class SectionFile{
  constructor(){
    this.File = null;
    this.Goods = [];
  }
  File:File;
  Goods:File[];
}

export class SectionImageInvalid{
  constructor(){
    this.Invalid = false;
    this.Goods = [];
  }
  Invalid:boolean;
  Goods:boolean[];
}
