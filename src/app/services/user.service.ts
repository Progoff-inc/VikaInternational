import { Good } from '../goods/goods.component';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CartItem } from './products.service';
// import { OnInit } from '@angular/core';

@Injectable()
export class UserService{
    public user:User;
    constructor(private router:Router){
        if(localStorage.getItem('user')){
            this.user = JSON.parse(localStorage.getItem('user'));
        }
    }


    loginUser(user){
        localStorage.setItem('user',JSON.stringify(user));
        this.user = user;
    }
    regUser(user){
        
        this.user = user;
        this.user.Deals.push(
            {
                Id:1,
                UserId:1,
                CreateDate:new Date(),
                User:null,
                Goods:[
                    {
                        Count:1,
                        Good:{
                            Id:1, 
                            Name:"Пинцет для наращивания ресниц", 
                            Description:"",
                            Price:720,
                            Color:"Золото (Gold)",
                            Image: "../../assets/images/goods/21.jpg",
                            Photoes: [
                                "../../assets/images/goods/21.jpg", "../../assets/images/goods/40.jpg", "../../assets/images/goods/23.jpg", "../../assets/images/goods/28.jpg" 
                            ]
                        }
                        
                    },
                    {
                        Count:1,
                        Good:{
                            Id:2, 
                            Name:"Пинцет для наращивания ресниц", 
                            Description:"",
                            Price:520,
                            Color:"Синий (Blue)",
                            Image: "../../assets/images/goods/44.jpg",
                            Photoes: [
                            "../../assets/images/goods/44.jpg", "../../assets/images/goods/51.jpg", "../../assets/images/goods/48.jpg", "../../assets/images/goods/54.jpg" 
                            ]
                        }
                        
                    }
                ]
            },
            {
                Id:2,
                UserId:1,
                CreateDate:new Date(),
                User:null,
                Goods:[
                    {
                        Count:1,
                        Good:{
                            Id:1, 
                            Name:"Пинцет для наращивания ресниц", 
                            Description:"",
                            Price:720,
                            Color:"Золото (Gold)",
                            Image: "../../assets/images/goods/21.jpg",
                            Photoes: [
                                "../../assets/images/goods/21.jpg", "../../assets/images/goods/40.jpg", "../../assets/images/goods/23.jpg", "../../assets/images/goods/28.jpg" 
                            ]
                        }
                        
                    },
                    {
                        Count:1,
                        Good:{
                            Id:2, 
                            Name:"Пинцет для наращивания ресниц", 
                            Description:"",
                            Price:520,
                            Color:"Синий (Blue)",
                            Image: "../../assets/images/goods/44.jpg",
                            Photoes: [
                            "../../assets/images/goods/44.jpg", "../../assets/images/goods/51.jpg", "../../assets/images/goods/48.jpg", "../../assets/images/goods/54.jpg" 
                            ]
                        }
                        
                    }
                ]
            }
        );
        localStorage.setItem('user',JSON.stringify(this.user));
    }
    logOut(){
        localStorage.removeItem('user');
        this.user = null;
        this.router.navigate(['/']);

    }
}

export class User{
    Id:number;
    Name:string;
    Email:string;
    Password:string;
    Phone?:string;

    Deals:Deal[];
}

export class Deal{
    Id:number;
    UserId:number;
    CreateDate:Date;
    ShowGoods?:boolean; //не приходит с базы не надо нигде заполнять
    
    User:User;
    Goods:CartItem[];
}