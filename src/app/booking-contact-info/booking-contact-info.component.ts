import { Component, OnInit, Input } from '@angular/core';
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
      Name: [this.us.user?(this.gs.book.User?this.gs.book.User.Name:this.us.user.Name):(this.gs.book.User?this.gs.book.User.Name:''), Validators.required],
      Email: [this.us.user?(this.gs.book.User?this.gs.book.User.Email:this.us.user.Email):(this.gs.book.User?this.gs.book.User.Email:''), [Validators.required, Validators.email]],
      Phone: [this.us.user?(this.gs.book.User?this.gs.book.User.Phone:this.us.user.Phone):(this.gs.book.User?this.gs.book.User.Phone:''), Validators.required],
    });
  }

  nextPage(){
    this.submitted=true;
    if(this.contactForm.invalid){
      return;
    }
    this.gs.book.User=JSON.parse(JSON.stringify(this.contactForm.value));
    this.parent.nextStep();
  }

  get f() { return this.contactForm.controls; };

}
