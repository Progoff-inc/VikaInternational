import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {

  constructor(public us:UserService, private ms:ModalService, private rt:Router) {
      if(!this.us.user){
        this.showModal();
      }
  }

  ngOnInit() {
    console.log(this.us.user)
  }
  showModal(){
    window.history.back();
  }

}
