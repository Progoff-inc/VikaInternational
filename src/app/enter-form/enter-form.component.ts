import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'enter-form',
  templateUrl: './enter-form.component.html',
  styleUrls: ['./enter-form.component.less']
})
export class EnterFormComponent implements OnInit {
  userForm:FormGroup;
  save:boolean;
  submitted = false;
  showError = false;
  constructor(public ms:ModalService, private fb: FormBuilder, private us:UserService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
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
          this.ms.close();
      }
      else{
          this.showError = true;
      }
    });
    
  }

  get f() { return this.userForm.controls; }

}
