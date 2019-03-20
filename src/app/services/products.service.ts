import { Good, Section, Book, NewSection, NewGood} from './models';
import { Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable()
export class GoodsService{
    book:Book = new Book();
    baseUrl:string='http://client.nomokoiw.beget.tech/vi/';

    constructor(private http: HttpClient ){
      if(sessionStorage.getItem('Cart')){
        this.book.Cart = JSON.parse(sessionStorage.getItem('Cart'));
      }
    }

    /**
     * Получение товара по Id
     * @param id идентификатор товара
     */
    getProduct(id){
      return this.http.get<Good>(this.baseUrl + 'DealsController.php?Key=get-good&Id='+id);
    }

    /**
     * Получение раздела с товарами
     * @param id идентификатор раздела
     */
    getSection(id){
      return this.http.get<Section>(this.baseUrl + 'DealsController.php?Key=get-section&Id='+id);
    }

    /**
     * Получение списка разделов
     */
    getSections(){
      return this.http.get<Section[]>(this.baseUrl + 'DealsController.php?Key=get-sections');
    }

    /**
     * Добавление товара в карзину
     * @param good товар
     */
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

    /**
     * Добавление раздела товаров
     * @param section Секция (Name, Image)
     */
    addSection(section:NewSection){
      return this.http.post<number>(this.baseUrl + 'DealsController.php?Key=add-section',section);
    }

    /**
     * Добавление товаров раздела
     * @param goods Список новых товаров раздела
     */
    addGoods(goods:NewGood[]){
      return this.http.post(this.baseUrl + 'DealsController.php?Key=add-section-goods', goods);
    }

    /**
     * Очистка корзины
     */
    clearCart(q:boolean=true){
      if (q){
        if(confirm("Очистить корзину?")){
          this.book.Cart = [];
          sessionStorage.removeItem('Cart');
        }
      }
      else {
        this.book.Cart = [];
        sessionStorage.removeItem('Cart');
      }
    }

    /**
     * Получение суммы корзины
     * @param d список объектов типа CartItem
     */
    getSum(d = this.book.Cart){
      let sum = 0;
      d.forEach(c => {
        sum +=c.Count*c.Good.Price;
      })
      return sum;
    }
    
}



