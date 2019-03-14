import { Component, OnInit, Input } from '@angular/core';
import { Book, BookingUser } from '../booking/booking.component';
import { GoodsService } from '../services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'booking-contact-info',
  templateUrl: './booking-contact-info.component.html',
  styleUrls: ['./booking-contact-info.component.less']
})
export class BookingContactInfoComponent implements OnInit {
  contactForm:FormGroup;
  submitted=false;
  @Input() parent;
  constructor(public gs:GoodsService, private fb:FormBuilder, private us:UserService) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      Name: [this.us.user?this.us.user.Name:'', Validators.required],
      Email: [this.us.user?this.us.user.Email:'', [Validators.required, Validators.email]],
      Phone: [this.us.user?this.us.user.Phone:'', Validators.required],
    });
  }

  nextPage(){
    this.submitted=true;
    if(this.contactForm.invalid){
      return;
    }
    this.parent.nextStep();
  }

  get f() { return this.contactForm.controls; };

}
