import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, User } from '../services/user.service';
import { userInfo } from 'os';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.less']
})
export class AuthFormComponent implements OnInit {
  userForm:FormGroup;
  submitted = false;
  constructor(public ms:ModalService, private fb: FormBuilder, private us:UserService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      PasswordConfirm: ['', Validators.required]
    });
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
    let u = new User();
    u.Id = 1;
    u.Email = this.userForm.value.Email;
    u.Name = this.userForm.value.Name;
    u.Password = this.userForm.value.Password;
    u.Deals = [];
    this.us.regUser(u);
    this.ms.close();
  }

  get f() { return this.userForm.controls; };
  get v() { return this.userForm.value; };
}
