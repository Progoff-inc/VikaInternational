import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ModalService } from '../services/modal.service';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less']
})
export class ChangePasswordComponent implements OnInit {
  @Input() change:any;
  userForm:FormGroup;
  submitted = false;
  invalid = false;
  constructor(private fb:FormBuilder, private us:UserService, private ms:ModalService, private ls:LoadService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      Password: ['', Validators.required],
      NewPassword:['', Validators.required],
      PasswordConfirm: ['', Validators.required]
    });
  }
  save(){
    this.submitted = true;
    if(this.userForm.invalid){
      return
    }
    if(this.v.NewPassword!=this.v.PasswordConfirm){
      return
    }
    this.ls.showLoad=true;
    
    this.us.updatePassword({UserId:this.change.UserId, Password:this.v.Password, NewPassword:this.v.NewPassword}).subscribe(res => {
      console.log(res);
      if(res){
        this.ls.showLoad=false;
        this.ms.close();
      }
      else{
        this.ls.showLoad=false;
        this.invalid=true;
      }
    })
  }
  get f() { return this.userForm.controls; };
  get v() { return this.userForm.value; };
}
