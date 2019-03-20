import { Component, OnInit, Input } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'booking-pay-delivery',
  templateUrl: './booking-pay-delivery.component.html',
  styleUrls: ['./booking-pay-delivery.component.less']
})
export class BookingPayDeliveryComponent implements OnInit {
  @Input() parent;
  PayDelForm:FormGroup;
  AddressForm:FormGroup;
  submitted=false;
  submittedAddress=false;
  deliv:boolean;
  constructor(public gs:GoodsService,private fb:FormBuilder) { }

  ngOnInit() {
    this.PayDelForm=this.fb.group({
      DeliverTypes:[this.gs.book.DeliverType?this.gs.book.DeliverType:'',Validators.required],
      PayTypes:[this.gs.book.PayType?this.gs.book.PayType:'',Validators.required]
    })
    this.AddressForm=this.fb.group({
      Country: [this.gs.book.Country?this.gs.book.Country:'',Validators.required],
      City: [this.gs.book.City?this.gs.book.City:'',Validators.required],
      Address: [this.gs.book.Address?this.gs.book.Address:'',Validators.required],
      PostIndex: [this.gs.book.PostIndex?this.gs.book.PostIndex:'',Validators.required]
    })
  }
  nextPage(){
    this.submitted=true;
    if(this.f.DeliverTypes.value=='delivery'){
      this.submittedAddress=true;
      if(this.AddressForm.invalid){
        return;
      }
    }
    if(this.PayDelForm.invalid){
      return;
    }
    this.gs.book.PayType=this.PayDelForm.value.PayTypes;
    this.gs.book.DeliverType=this.PayDelForm.value.DeliverTypes;
    this.gs.book.Country=this.AddressForm.value.Country;
    this.gs.book.City=this.AddressForm.value.City;
    this.gs.book.Address=this.AddressForm.value.Address;
    this.gs.book.PostIndex=this.AddressForm.value.PostIndex;
    this.parent.nextStep();
  }

  get f() { return this.PayDelForm.controls; };
  get g() { return this.AddressForm.controls; };
}
