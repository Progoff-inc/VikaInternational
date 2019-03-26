import { Component, OnInit, Input } from '@angular/core';
import { GoodsService } from '../services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ModalService } from '../services/modal.service';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'booking-contact-info',
  templateUrl: './booking-contact-info.component.html',
  styleUrls: ['./booking-contact-info.component.less']
})
export class BookingContactInfoComponent implements OnInit {
  contactForm:FormGroup;
  submitted=false;
  @Input() parent;
  constructor(public gs:GoodsService, private fb:FormBuilder, private us:UserService, private ms:ModalService, private ls:LoadService) { }

  ngOnInit() {
    this.setForm();
  }

  nextPage(){
    this.submitted=true;
    if(this.contactForm.invalid){
      return;
    }
    if(this.us.user){
      this.gs.book.User=JSON.parse(JSON.stringify(this.contactForm.value));
      this.parent.nextStep();
    }
    else{
      this.ls.showLoad=true;
      this.us.checkEmail(this.contactForm.value.Email).subscribe(data=>{
        if (data){
          this.ls.showLoad=false;
          this.gs.book.User=JSON.parse(JSON.stringify(this.contactForm.value));
          this.parent.nextStep();
        }
        else {
          this.ls.showLoad=false;
          this.ms.open('enter',this.contactForm.value.Email);
        }
      })
    }
  }

  setForm(){
    this.contactForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', Validators.required],
    });
  }
  get f() { return this.contactForm.controls; };

}
