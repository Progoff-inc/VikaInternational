import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GoodsService } from '../services/products.service';
import { NewGood, NewSectionImage, UploadTypes } from '../services/models';
import { LoadService } from '../services/load.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.less']
})
export class AddSectionComponent implements OnInit {
  sectionForm:FormGroup;
  goods:NewGood[] = [];
  
  image:File;
  invalidImage = false;
  goodsImageInvalids:boolean[] = [];
  goodsFiles:File[] = [];
  goodsShow:boolean[] = [];
  submitted = false;
  loadGoodsCount = 0;
  constructor(private fb:FormBuilder, private gs:GoodsService, private ls:LoadService) { }

  ngOnInit() {
    this.sectionForm = this.fb.group({
      Name: ['', Validators.required]
    });
  }
  addSection(){
    this.submitted = true;
    if(this.sectionForm.invalid || !this.image || this.invalidImage){
      return
    }
    for(let i = 0; i< this.goodsImageInvalids.length; i++){
      if(this.goodsImageInvalids[i]){
        return
      }
      if(!this.goodsFiles[i]){
        return;
      }
    }
    if(this.goods.length==0){
      return
    }
    for(let i = 0; i< this.goods.length; i++){
      if(!this.checkGood(this.goods[i])){
        return
      }
    }
    this.ls.showLoad=true;
    this.ls.load = 0;
    var formData = new FormData();
    formData.append('Data', this.image);
    this.gs.addSection(this.sectionForm.value).subscribe(id => {
      if(id){
        this.goods.forEach(g => {
          g.SectionId = id;
        })
        this.gs.UploadFile(id, UploadTypes.Section, formData).subscribe(event=>{
          if(event.type == HttpEventType.UploadProgress){
            this.ls.load = Math.round(event.loaded/event.total * 100);
            
          }
          else if(event.type == HttpEventType.Response){
            
          }
          
        })
        this.gs.addGoods(this.goods).subscribe((goods)=> {
          this.loadGoodsCount = goods.length;
          for(let i =0; i<goods.length;i++){
            this.ls.load= 0;
            var gFormData  = new FormData();
            gFormData.append('Data', this.goodsFiles[i]);
            this.gs.UploadFile(goods[i].GoodId, UploadTypes.Good, gFormData).subscribe(event=>{
              if(event.type == HttpEventType.UploadProgress){
                console.log(event);
                this.ls.load = Math.round(event.loaded/event.total * 100);
                
              }
              else if(event.type == HttpEventType.Response){
                this.loadGoodsCount--;
                this.ls.load= 0;
                if(this.loadGoodsCount==0){
                  this.sectionForm.reset();
                  this.goods=[];
                  this.image=null;
                  this.submitted = false;
                  this.ls.load = -1;
                  this.ls.showLoad=false;
                }
              }
            })
          }
            
          
        })
      }else{
        throw new Error("Отказано в доступе");
      }
      
     
    })
  }
  putFile(event, type='section', i?){
    if(event.target.files[0].type=='image/jpeg'){
      if(type=='section'){
        this.image = <File>event.target.files[0];
        this.invalidImage = false;
      }
      else{
        this.goodsFiles[i]=<File>event.target.files[0];
        this.goodsImageInvalids[i]=false;
      }
      
    }else{
      if(type=='section'){
        this.invalidImage = true;
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
    else{
      this.goodsFiles[i]=null;
    }
  }
  addGood(){
    if(this.goods.length==0 || this.checkGood(this.goods[this.goods.length-1]) || !this.goodsFiles[this.goods.length-1]){
      this.goods.push({
        SectionId:0,
        Name:'',
        Description:'',
        Price:null,
        Color:''
      })
      this.goodsFiles.push(null);
      this.goodsImageInvalids.push(false);
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

  removeNew(i){
    this.goods.splice(i,1);
    this.goodsFiles.splice(i,1);
    this.goodsImageInvalids.splice(i,1);
  }
  get f() { return this.sectionForm.controls; };


}
