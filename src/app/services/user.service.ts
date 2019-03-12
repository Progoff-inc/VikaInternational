import { Good } from '../goods/goods.component';
import { OnInit } from '@angular/core';

export class UserService implements OnInit{
    public user:User;

    ngOnInit(){
        if(localStorage.getItem('user')){
            this.user = JSON.parse(localStorage.getItem('user'));
        }
    }


    loginUser(user){
        localStorage.setItem('user',JSON.stringify(user));
        this.user = user;
    }
    regUser(user){
        localStorage.setItem('user',JSON.stringify(user));
        this.user = user;
    }
}

export class User{
    Id:number;
    Name?:string;
    Email:string;
    Password:string;
    Phone?:string;

    Deals:Deal[];
}

export class Deal{
    Id:number;
    UserId:number;
    CreateDate:Date;
    
    User:User;
    Goods:Good[];
}