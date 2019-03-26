import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { UserService } from '../services/user.service';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.less']
})
export class ChangeInfoComponent implements OnInit {
  @Input() change:any;
  submitted = false;
  userForm:FormGroup;
  showError = false;
  constructor(private fb:FormBuilder, private ms:ModalService, private us:UserService, private ls:LoadService) { 
    
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      Email: [this.change.Email?this.change.Email:'', [Validators.email]],
      Phone: [this.change.Phone?this.change.Phone:'']
    });
    this.userForm.valueChanges.subscribe(()=>{
      this.showError = false;
    })
  }

  /**
   * Сохранение измененных данных
   */
  save(){
    this.submitted=true;
    if(this.userForm.invalid){
      return;
    }
    this.ls.showLoad=true;
    let userInfo = {UserId:this.us.user.UserId, Email:this.userForm.value.Email, Phone:this.userForm.value.Phone};
    this.us.updateUserInfo(userInfo).subscribe((data)=>{
      if(data){
        this.us.user.Phone= userInfo.Phone;
        this.us.user.Email = userInfo.Email;
        this.ls.showLoad=false;
        this.ms.close();
      }
      else{
        this.ls.showLoad=false;
        if(this.us.user.Email != userInfo.Email){
          this.showError = true;
        }
        else{
          
          this.ms.close();
        }
        
      }
      
    });
  }

  /**
   * Значения ошибок
   */
  get f() { return this.userForm.controls; };

}
