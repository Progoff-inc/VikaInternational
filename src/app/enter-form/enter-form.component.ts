import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { UserService } from '../services/user.service';
import { GoodsService } from '../services/products.service';
import { LoadService } from '../services/load.service';

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
  constructor(public ms:ModalService, private fb: FormBuilder, private ls:LoadService, private us:UserService,private gs:GoodsService) { }

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
    this.ls.showLoad=true;
    this.us.loginUser(this.userForm.value.Email, this.userForm.value.Password).subscribe(user => {
      
      if(user){
        if(this.save){
          localStorage.setItem('user',JSON.stringify(user[0]));
        }else{
          sessionStorage.setItem('user',JSON.stringify(user[0]));
        }
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
  remember(){
    this.ms.type = 'remember-password';
  }

  get f() { return this.userForm.controls; }

}
