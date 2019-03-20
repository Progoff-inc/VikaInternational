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
      DeliverTypes:['',Validators.required],
      PayTypes:['',Validators.required]
      // Pickup: ['',Validators.required],
      // Delivery:['',Validators.required],
      // Cash:['',Validators.required],
      // Card:['',Validators.required]
    })
    this.AddressForm=this.fb.group({
      Country: ['',Validators.required],
      City: ['',Validators.required],
      Address: ['',Validators.required],
      PostIndex: ['',Validators.required]
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
    this.parent.nextStep();
  }

  get f() { return this.PayDelForm.controls; };
  get g() { return this.AddressForm.controls; };
}
