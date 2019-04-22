import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { GoodsService } from '../services/products.service';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.less']
})
export class AuthFormComponent implements OnInit {
  userForm:FormGroup;
  submitted = false;
  showError = false;
  constructor(private ls:LoadService, public ms:ModalService, private gs:GoodsService, private fb: FormBuilder, private us:UserService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone:[''],
      Password: ['', Validators.required],
      PasswordConfirm: ['', Validators.required]
    });
    this.userForm.valueChanges.subscribe(()=>{
      this.showError = false;
    })
  }
  enter(){
    this.ms.type='enter';
  }
  Auth(){
    this.submitted = true;
    if(this.userForm.invalid){
      return;
    }
    if(this.userForm.value.Password != this.userForm.value.PasswordConfirm){
      return;
    }
    this.ls.showLoad=true;
    let u = {
      Email:this.userForm.value.Email,
      Name:this.userForm.value.Name,
      Password:this.userForm.value.Password,
      Phone:this.userForm.value.Phone
    }
    
    this.us.regUser(u).subscribe(user => {
      if(user){
        sessionStorage.setItem('user',JSON.stringify(user[0]));
          this.us.user = user[0];
          this.us.setToken(user[1]);
          this.gs.book.User = {Name:user[0].Name, Email:user[0].Email, Phone:user[0].Phone};
          this.ls.showLoad=false;
          this.ms.close();
      }
      else{
        this.ls.showLoad=false;
          this.showError = true;
      }
    });
    
  }

  get f() { return this.userForm.controls; };
  get v() { return this.userForm.value; };
}
