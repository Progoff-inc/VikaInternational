import { Good } from '../goods/goods.component';
// import { OnInit } from '@angular/core';

export class UserService{
    public user:User;
    constructor(){
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

    Deals:Deal[] = [
        {
            Id:1,
            UserId:1,
            CreateDate:new Date(),
            User:new User(),
            Goods:[
                {
                    Id:1, 
                    Name:"Пинцет для наращивания ресниц", 
                    Description:"",
                    Price:720,
                    Color:"Золото (Gold)",
                    Image: "../../assets/images/goods/21.jpg",
                    Photoes: [
                        "../../assets/images/goods/21.jpg", "../../assets/images/goods/40.jpg", "../../assets/images/goods/23.jpg", "../../assets/images/goods/28.jpg" 
                    ]
                },
                {
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
            ]
        }
    ];
}

export class Deal{
    Id:number;
    UserId:number;
    CreateDate:Date;
    
    User:User;
    Goods:Good[];
}