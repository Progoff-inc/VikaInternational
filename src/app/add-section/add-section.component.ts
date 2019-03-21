import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GoodsService } from '../services/products.service';
import { NewGood } from '../services/models';

@Component({
  selector: 'add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.less']
})
export class AddSectionComponent implements OnInit {
  sectionForm:FormGroup;
  goods:NewGood[] = [];
  goodsShow:boolean[] = [];
  submitted = false;
  constructor(private fb:FormBuilder, private gs:GoodsService) { }

  ngOnInit() {
    this.sectionForm = this.fb.group({
      Name: ['', Validators.required],
      Image: ['', Validators.required]
    });
  }
  addSection(){
    this.submitted = true;
    if(this.sectionForm.invalid){
      return
    }
    for(let i = 0; i< this.goods.length; i++){
      if(!this.checkGood(this.goods[i])){
        return
      }
    }
    this.gs.addSection(this.sectionForm.value).subscribe(id => {
      this.goods.forEach(g => {
        g.SectionId = id;
      })
      this.gs.addGoods(this.goods).subscribe(()=> {
        this.sectionForm.reset();
        this.goods=[];
        this.submitted = false;
      })
    })
  }
  addGood(){
    if(this.goods.length==0 || this.checkGood(this.goods[this.goods.length-1])){
      this.goods.push({
        SectionId:0,
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
  get f() { return this.sectionForm.controls; };


}
