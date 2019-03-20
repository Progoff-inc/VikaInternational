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
  constructor(private fb:FormBuilder, private gs:GoodsService) { }

  ngOnInit() {
    this.sectionForm = this.fb.group({
      Name: ['', Validators.required],
      Image: ['', Validators.required]
    });
  }
  addSection(){
    if(this.sectionForm.invalid){
      return
    }
    this.gs.addSection(this.sectionForm.value).subscribe(id => {

    })
  }
  addGood(){
    this.goods.push({
      SectionId:0,
      Name:'',
      Description:'',
      Price:null,
      Color:'',
      Image:''
    })

  }

  get f() { return this.sectionForm.controls; };


}
