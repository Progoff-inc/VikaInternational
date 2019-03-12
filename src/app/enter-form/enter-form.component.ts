import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'enter-form',
  templateUrl: './enter-form.component.html',
  styleUrls: ['./enter-form.component.less']
})
export class EnterFormComponent implements OnInit {
  userForm:FormGroup;
  save:boolean;
  submitted = false;
  constructor(public ms:ModalService, private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
  }
  auth(){
    this.ms.type='auth';
  }

  Enter(){
    console.log(this.userForm);
    this.submitted = true;
    if(this.userForm.invalid){
      return;
    }
    
  }

  get f() { return this.userForm.controls; }

}
