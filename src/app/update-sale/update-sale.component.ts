import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { Section, NewGood, Sale } from '../services/models';

@Component({
  selector: 'update-sale',
  templateUrl: './update-sale.component.html',
  styleUrls: ['./update-sale.component.less']
})
export class UpdateSaleComponent implements OnInit {
  sales:Sale[];
  goods = [];
  salesCopy:Sale[];
  constructor(private gs:GoodsService) { }

  ngOnInit() {
    this.gs.getSales().subscribe(data => {
      this.sales = data;
      this.salesCopy = JSON.parse(JSON.stringify(data));
    })
  }
  checkChanges(s:Sale){
    let s1 = this.salesCopy.find(se => se.SaleId==s.SaleId);
    return !this.deepEqual(s,s1);
  }
  saveChanges(s:Sale){
    for(let j = 0; j<Object.keys(s).length; j++){
      if(s[Object.keys(s)[j]]=='' || !s[Object.keys(s)[j]]){
        return
      }
    }
    
    this.gs.updateSale(s).subscribe((d)=>{
      let s1 = this.salesCopy.find(se => se.SaleId==s.SaleId);
      Object.keys(s).forEach(k => {
        s1[k]=s[k]
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
