export interface Good{
    GoodId:number;
    SectionId:number;
    Name:string;
    Description:string;
    Price:number;
    Color:string;
    Image:string;
  }

  export class CartItem{
    DealId?:number;
    GoodId?:number;
    Count:number;
  
    Good:Good;
  }

  export class User{
    UserId:number;
    Name:string;
    Email:string;
    Password:string;
    Phone?:string;
    IsAdmin?:boolean;

    Deals:Deal[];
}

export class Deal{
    DealId:number;
    UserId:number;
    CreateDate:Date;
    ShowGoods?:boolean; //не приходит с базы не надо нигде заполнять
    
    User:User;
    Goods:CartItem[];
}

export interface Section{
  SectionId:number;
  Name:string;
  Image:string;

  Goods:Good[];
}

export interface NewUser{
  Name:string;
  Password:string;
  Email:string;
  Phone?:string;
}

export interface UserInfo{
  UserId:number;
  Phone:string;
  Email:string;
}

export class Book{
  Cart:CartItem[] = [];
  User:BookingUser;
  DeliverType:DeliverTypes;
  PayType:PayTypes;
  Country:string;
  City:string;
  Address:string;
  PostIndex:string;

  plus(g){
    let i = this.Cart.find(x => x.Good.GoodId==g.Good.GoodId);
    i.Count++;
    sessionStorage.setItem('Cart',JSON.stringify(this.Cart));
  }
  minus(g){
    let i = this.Cart.find(x => x.Good.GoodId==g.Good.GoodId);
    i.Count--;
    sessionStorage.setItem('Cart',JSON.stringify(this.Cart));
    
  }
}

export class BookingUser{
  Name:string;
  Email:string;
  Phone:string;
}

export enum DeliverTypes{
  Pickup = "pickup", 
  Delivery = "delivery"
}

export enum PayTypes{
  Cash = "cash", 
  Card = "card"
}

export interface NewSection{
  Name:string;
  Image:string;
}

export interface NewGood{
  SectionId:number;
  Name:string;
  Description:string;
  Price:number;
  Color:string;
  Image:string;
}
