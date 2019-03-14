import { Good } from './models';
import { Book } from '../booking/booking.component';
// import { OnInit } from '@angular/core';
const ph = "../../assets/images/sizors.png";
const ph1 = "../../assets/images/goods/1.jpg";
const ph2 = "../../assets/images/goods/2.jpg";
const ph3 = "../../assets/images/goods/3.jpg";
const ph4 = "../../assets/images/goods/4.jpg";

export class GoodsService{
    book:Book = new Book();
    goods:Good[] = [
        {
          GoodId:1, 
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
          GoodId:2, 
          Name:"Пинцет для наращивания ресниц", 
          Description:"",
          Price:520,
          Color:"Синий (Blue)",
          Image: "../../assets/images/goods/44.jpg",
          Photoes: [
            "../../assets/images/goods/44.jpg", "../../assets/images/goods/51.jpg", "../../assets/images/goods/48.jpg", "../../assets/images/goods/54.jpg" 
          ]
        },
        {
          GoodId:3, 
          Name:"Пинцет для наращивания ресниц", 
          Description:"",
          Price:500,
          Color:"Мульти (Multicolor)",
          Image: "../../assets/images/goods/62.jpg",
          Photoes: [
            "../../assets/images/goods/62.jpg", "../../assets/images/goods/73.jpg", "../../assets/images/goods/80.jpg", "../../assets/images/goods/66.jpg" 
          ]
        },
        {
          GoodId:4, 
          Name:"Пинцет для наращивания ресниц", 
          Description:"",
          Price:720,
          Color:"Бронзовый (Bronze)",
          Image: "../../assets/images/goods/84.jpg",
          Photoes: [
            "../../assets/images/goods/84.jpg", "../../assets/images/goods/83.jpg", "../../assets/images/goods/88.jpg", "../../assets/images/goods/94.jpg" 
          ]
        },
        {
          GoodId:5, 
          Name:"Пинцет для наращивания ресниц", 
          Description:"",
          Price:440,
          Color:"Черный (Black)",
          Image: "../../assets/images/goods/98.jpg",
          Photoes: [
            "../../assets/images/goods/98.jpg", "../../assets/images/goods/99.jpg"
          ]
        },
        {
          GoodId:6, 
          Name:"Пинцет для наращивания ресниц", 
          Description:"",
          Price:440,
          Color:"Белый (White)",
          Image: "../../assets/images/goods/100.jpg",
          Photoes: [
            "../../assets/images/goods/100.jpg", "../../assets/images/goods/101.jpg", "../../assets/images/goods/106.jpg", "../../assets/images/goods/109.jpg" 
          ]
        },
        {
          GoodId:7, 
          Name:"Пинцет для наращивания ресниц", 
          Description:"",
          Price:440,
          Color:"Серебро (Silver)",
          Image: "../../assets/images/goods/103.jpg",
          Photoes: [
            "../../assets/images/goods/103.jpg", "../../assets/images/goods/110.jpg"
          ]
        },
        {
          GoodId:8, 
          Name:"Пинцет для наращивания ресниц", 
          Description:"",
          Price:440,
          Color:"Розовый (Pink)",
          Image: "../../assets/images/goods/104.jpg",
          Photoes: [
            "../../assets/images/goods/104.jpg", "../../assets/images/goods/105.jpg"
          ]
        },
        {
          GoodId:9, 
          Name:"Пинцет для наращивания ресниц", 
          Description:"",
          Price:440,
          Color:"Красный (Red)",
          Image: "../../assets/images/goods/97.jpg",
          Photoes: [
            "../../assets/images/goods/97.jpg", "../../assets/images/goods/96.jpg"
          ]
        }
  
        
      ];
    constructor(){
      if(sessionStorage.getItem('Cart')){
        this.book.Cart = JSON.parse(sessionStorage.getItem('Cart'));
      }
    }
    getProduct(id){
        return this.goods.find(x => x.GoodId==id);
    }
    addCartProduct(good:Good){
      let i = this.book.Cart.map(x => x.Good.GoodId).indexOf(good.GoodId);
      if(i>-1){
        this.book.Cart[i].Count+=1
        sessionStorage.setItem('Cart',JSON.stringify(this.book.Cart));
      }
      else{
        this.book.Cart.unshift({Good:good, Count:1});
        sessionStorage.setItem('Cart',JSON.stringify(this.book.Cart));
      }
      
    }
    clearCart(){
      if(confirm("Очистить корзину?")){
        this.book.Cart = [];
        sessionStorage.removeItem('Cart');
      }
      
    }
    getSum(d = this.book.Cart){
      let sum = 0;
      d.forEach(c => {
        sum +=c.Count*c.Good.Price;
      })
      return sum;
    }
    
}


