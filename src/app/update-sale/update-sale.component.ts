import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { Section, NewGood, Sale, UploadTypes } from '../services/models';
import { HttpEventType } from '@angular/common/http';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'update-sale',
  templateUrl: './update-sale.component.html',
  styleUrls: ['./update-sale.component.less']
})
export class UpdateSaleComponent implements OnInit {
  sales:Sale[] = [];
  goods = [];
  salesCopy:Sale[];
  goodsImageInvalids:boolean[] = [];
  goodsFiles = [];
  constructor(private gs:GoodsService, private ls:LoadService) { }

  ngOnInit() {
    this.ls.showLoad=true;
    this.gs.getSales().subscribe(data => {
      data.forEach(s => {
        this.goodsFiles.push(null);
        this.goodsImageInvalids.push(false);
      })
      console.log(this.goodsFiles);
      this.sales = data;
      this.salesCopy = JSON.parse(JSON.stringify(data));
      this.ls.showLoad=false;
    })
  }
  checkChanges(s:Sale){
    let s1 = this.salesCopy.find(se => se.SaleId==s.SaleId);
    return !this.deepEqual(s,s1);
  }
  saveChanges(s:Sale, i){
    for(let i = 0; i< this.goodsImageInvalids.length; i++){
      if(this.goodsImageInvalids[i]){
        return
      }
    }
    for(let j = 0; j<Object.keys(s).length; j++){
      if(s[Object.keys(s)[j]]=='' || !s[Object.keys(s)[j]]){
        if(Object.keys(s)[j] == 'Image' && this.goodsFiles[i]){
          continue
        }
        else{
          console.log(this.goodsFiles[i]);
          return
        }
        
      }
    }
    this.ls.showLoad=true;
    
    
    this.gs.updateSale(s).subscribe((d)=>{
      if(d){
        if(this.goodsFiles[i]){
          this.ls.load = 0;
          var formData = new FormData();
          formData.append('Data', this.goodsFiles[i]);
          this.gs.UploadFile(s.SaleId, UploadTypes.Sale, formData).subscribe(event=>{
            if(event.type == HttpEventType.UploadProgress){
              this.ls.load = Math.round(event.loaded/event.total * 100);
              
            }
            else if(event.type == HttpEventType.Response){
              s.Image=event.body[0];
              this.goodsFiles[i] = null;
              let s1 = this.salesCopy.find(se => se.SaleId==s.SaleId);
              Object.keys(s).forEach(k => {
                s1[k]=s[k]
              })
              console.log(event);
              this.ls.load = -1;
              this.ls.showLoad=false;
            }
            
          })
        }else{
          let s1 = this.salesCopy.find(se => se.SaleId==s.SaleId);
          Object.keys(s).forEach(k => {
            s1[k]=s[k]
          })
          this.ls.showLoad=false;
        }
      }else{
        this.ls.showLoad=false;
        throw new Error("Отказано в доступе");
        
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

  unloadLink(s){
    s.Image = null;
  }

  putFile(event, i){
    if(event.target.files[0].type=='image/jpeg'){
      this.goodsFiles[i]=<File>event.target.files[0];
      console.log(this.goodsFiles[i])
      this.goodsImageInvalids[i]=false;
      
    }else{
      this.goodsImageInvalids[i]=true;
    }

    
  }
  unload(i){
    this.goodsFiles[i]=null;
  }
  remove(id, i){
    this.gs.removeSale(id).subscribe(d => {
      if(d){
        this.sales.splice(i,1);
        this.salesCopy.splice(i,1);
        this.goodsImageInvalids.splice(i,1);
        this.goodsFiles.splice(i,1);
      }else{
        throw new Error("Отказано в доступе");
      }
      
    })
  }

}
