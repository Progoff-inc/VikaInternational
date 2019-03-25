import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { UserService } from '../services/user.service';
import { GoodsService } from '../services/products.service';

@Component({
  selector: 'enter-form',
  templateUrl: './enter-form.component.html',
  styleUrls: ['./enter-form.component.less']
})
export class EnterFormComponent implements OnInit {
  @Input() email=null;
  @Input() closeFunc:Function;
  userForm:FormGroup;
  save:boolean;
  submitted = false;
  showError = false;
  constructor(public ms:ModalService, private fb: FormBuilder, private us:UserService,private gs:GoodsService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      Email: [this.email?this.email:'', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
    this.userForm.valueChanges.subscribe(()=>{
      this.showError = false;
    })
  }
  auth(){
    this.ms.type='auth';
  }

  Enter(){
    this.submitted = true;
    if(this.userForm.invalid){
      return;
    }
    this.us.loginUser(this.userForm.value.Email, this.userForm.value.Password).subscribe(user => {
      
      if(user){
        if(this.save){
          localStorage.setItem('user',JSON.stringify(user));
        }else{
          sessionStorage.setItem('user',JSON.stringify(user));
        }
          this.us.user = user;
          this.gs.book.User = {Name:user.Name, Email:user.Email, Phone:user.Phone};
          this.ms.close();
      }
      else{
          this.showError = true;
      }
    });
    
  }
  remember(){
    this.ms.type = 'remember-password';
  }

  get f() { return this.userForm.controls; }

}
