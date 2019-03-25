import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GoodsService } from '../services/products.service';
import { UploadTypes } from '../services/models';
import { LoadService } from '../services/load.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.less']
})
export class AddSaleComponent implements OnInit {
  submitted = false;
  saleForm:FormGroup;
  image = null;
  invalidImage = false;
  constructor(private fb:FormBuilder, private gs:GoodsService, private ls:LoadService) { }

  ngOnInit() {
    this.saleForm = this.fb.group({
      Name:['',Validators.required],
      Description:['',Validators.required],
      Price:['',Validators.required],
    })
  }

  addSale(){
    this.submitted = true;
    if(!this.image || this.invalidImage){
      return;
    }
    if(this.saleForm.invalid){
      return;
    }
    this.ls.showLoad=true;
    this.ls.load = 0;
    const formData = new FormData();
    formData.append('Data', this.image);
    this.gs.addSale(this.saleForm.value).subscribe(id => {
      
      
      this.gs.UploadFile(id, UploadTypes.Sale, formData).subscribe(event=>{
        if(event.type == HttpEventType.UploadProgress){
          this.ls.load = Math.round(event.loaded/event.total * 100);
          
        }
        else if(event.type == HttpEventType.Response){
          this.image=null;
          this.ls.load = -1;
          this.ls.showLoad=false;
          this.saleForm.reset();
          this.submitted=false;
        }
        
      })
    })
  }
  

  putFile(event){
    if(event.target.files[0].type=='image/jpeg'){
      this.image = <File>event.target.files[0];
      this.invalidImage = false;
    }else{
      this.invalidImage = true;
    }

    
  }
  unload(){
    this.image = null;
  }
  get f() { return this.saleForm.controls; };

}
