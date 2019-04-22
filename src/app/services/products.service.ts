import { Good, Section, Book, NewSection, NewGood, Sale, NewSale, NewDeal, NewCartItem, GoodTypes, UploadTypes} from './models';
import { Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from './user.service';


@Injectable()
export class GoodsService{
    bookId:number=null;
    book:Book = new Book();
    baseUrl:string='http://client.nomokoiw.beget.tech/vi/';

    constructor(private http: HttpClient, private us:UserService ){
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
     * Возвращает разделы с товарами
     */
    getAdminSections(){
      return this.http.get<Section[]>(this.baseUrl + 'DealsController.php?Key=get-admin-sections');
    }

    /**
     * Добавление товара в карзину
     * @param good товар или акция
     * @param type тип товара
     */
    addCartProduct(good:any, type:GoodTypes = GoodTypes.Good){
      if(type == GoodTypes.Good){
        let i = this.book.Cart.filter(c => c.Type == GoodTypes.Good).map(x => x.Good.GoodId).indexOf(good.GoodId);
        if(i>-1){
          this.book.Cart[i].Count+=1
          sessionStorage.setItem('Cart',JSON.stringify(this.book.Cart));
        }
        else{
          this.book.Cart.unshift({Good:good, Count:1, Type:GoodTypes.Good});
          sessionStorage.setItem('Cart',JSON.stringify(this.book.Cart));
        }
      }else{
        let i = this.book.Cart.filter(c => c.Type == GoodTypes.Sale).map(x => x.Good.SaleId).indexOf(good.SaleId);
        if(i>-1){
          this.book.Cart[i].Count+=1
          sessionStorage.setItem('Cart',JSON.stringify(this.book.Cart));
        }
        else{
          this.book.Cart.unshift({Good:good, Count:1, Type:GoodTypes.Sale});
          sessionStorage.setItem('Cart',JSON.stringify(this.book.Cart));
        }
      }
      
      
    }

    /**
     * Добавление раздела товаров
     * @param section Секция (Name, Image)
     */
    addSection(section:NewSection){
      return this.http.post<number>(this.baseUrl + 'DealsController.php?Key=add-section&Token='+this.us.getToken(),section);
    }
    
    /**
     * Сохраняет изменения в разделе
     * @param section Измененный раздел
     */
    updateSection(section:NewSection, id){
      return this.http.post<number>(this.baseUrl + 'DealsController.php?Key=update-section&Id='+id+'&Token='+this.us.getToken(),section);
    }

    /**
     * Сохраняет изменения в разделе
     * @param section Измененный раздел
     */
    updateSectionGoods(goods:Good[]){
      return this.http.post<number>(this.baseUrl + 'DealsController.php?Key=update-goods&Token='+this.us.getToken(), goods);
    }

    /**
     * Добавление товаров раздела
     * @param goods Список новых товаров раздела
     */
    addGoods(goods:NewGood[]){
      return this.http.post<Good[]>(this.baseUrl + 'DealsController.php?Key=add-section-goods&Token='+this.us.getToken(), goods);
    }

    /**
     * Получение списка акций
     */
    getSales(){
      return this.http.get<Sale[]>(this.baseUrl + 'DealsController.php?Key=get-sales');
    }

    /**
     * Добавление новой акции
     * @param sale Акция без SaleId
     */
    addSale(sale:NewSale){
      return this.http.post<number>(this.baseUrl + 'DealsController.php?Key=add-sale&Token='+this.us.getToken(),sale);
    }

    updateSale(sale:Sale){
      return this.http.post<number>(this.baseUrl + 'DealsController.php?Key=update-sale&Token='+this.us.getToken(),sale);
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
    /**
     * Сохранение заказа
     * @param deal объект deal типа NewDeal[]
     */
    addDeal(deal:NewDeal){
      return this.http.post<number>(this.baseUrl+'DealsController.php?Key=add-deal',deal);
    }
    /**
     * Добавление товаров сделки
     * @param goods объект типа NewCartItem
     */
    addDealGoods(goods:NewCartItem[]){
      return this.http.post<Good[]>(this.baseUrl + 'DealsController.php?Key=add-deal-goods', goods);
    }


    /**
     * Загрузка файлов на сервер
     * @param id Id родителя изображения
     * @param type тип родителя изображения
     * @param data изображение (FormData)
     */
    UploadFile(id, type:UploadTypes, data) {
      return this.http.post<string>(this.baseUrl + 'DealsController.php?Key=upload-file&Id='+id+'&Type='+type+'&Token='+this.us.getToken(), data, {
        reportProgress:true,
        observe:'events'
      });
    }

    removeSale(id){
      return this.http.delete(this.baseUrl + 'DealsController.php?Key=remove-sale&Id='+id);
    }

    removeSection(id){
      return this.http.delete(this.baseUrl + 'DealsController.php?Key=remove-section&Id='+id);
    }

    removeGood(id){
      return this.http.delete(this.baseUrl + 'DealsController.php?Key=remove-good&Id='+id);
    }

    
}



