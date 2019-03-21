import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GoodsService } from '../services/products.service';

@Component({
  selector: 'add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.less']
})
export class AddSaleComponent implements OnInit {
  submitted = false;
  saleForm:FormGroup;
  constructor(private fb:FormBuilder, private gs:GoodsService) { }

  ngOnInit() {
    this.saleForm = this.fb.group({
      Name:['',Validators.required],
      Image:['',Validators.required],
      Description:['',Validators.required],
      Price:['',Validators.required],
    })
  }

  addSale(){
    this.submitted = true;
    if(this.saleForm.invalid){
      return;
    }
    this.gs.addSale(this.saleForm.value).subscribe(id => {
      this.saleForm.reset();
      this.submitted=false;
    })
  }
  get f() { return this.saleForm.controls; };

}
