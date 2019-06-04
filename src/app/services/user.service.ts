import { Good, NewUser, User, UserInfo, UserToken } from './models';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CartItem } from './models';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { ModalService } from './modal.service';
import { GoodsService } from './products.service';
import { LoadService } from './load.service';
// import { OnInit } from '@angular/core';

@Injectable()
export class UserService{
    public user:User;
    
    baseUrl:string='http://vikainternational.ru/back/';

    constructor(private router:Router, private http: HttpClient, private gs:GoodsService, private ls:LoadService){
        this.updateUser();
    }

    getToken(){
        return this.gs.getToken();
    }

    setToken(token:string){
        this.gs.setToken(token);
    }

    updateUser(){
        if(localStorage.getItem('user')){
            let u:User = JSON.parse(localStorage.getItem('user'));
            this.getUserById(u.UserId);
        }
        if(sessionStorage.getItem('user')){
            let u:User = JSON.parse(sessionStorage.getItem('user'));
            this.getUserById(u.UserId);
        }
    }



    /**
     * Вход пользователя по Email и паролю
     * Возвращает false если пользователь не найден
     * @param email Email пользователя для входа
     * @param password Пароль пользователя для входа
     */
    loginUser(email:string, password:string){
        return this.http.get<UserToken>(this.baseUrl + 'UserController.php?Key=get-user&Email='+email+'&Password='+password);
    }

    /**
     * Регистрация пользователя
     * Возвращает false если пользователь с таким Email уже существует
     * @param user Объект типа NewUser
     */
    regUser(user:NewUser){
        return this.http.post<UserToken>(this.baseUrl + 'UserController.php?Key=add-user', user);
    }

    /**
     * Изменение Email и Телефона пользователя
     * Если новый Email уже существует возвращает false
     * @param userInfo Объект содержащий UserId, Email, Phone
     */
    updateUserInfo(userInfo:UserInfo){
        return this.http.post(this.baseUrl + 'UserController.php?Key=update-user-info&Token='+this.gs.getToken(), userInfo);
    }

    /**
     * Выход пользователя
     */
    logOut(){
        if(localStorage.getItem('user')){
            localStorage.removeItem('user');
        }
        if(sessionStorage.getItem('user')){
            sessionStorage.removeItem('user');
        }
        
        
        this.userExit().subscribe(()=>{
            this.user = null;
            this.setToken(null);
        })
        
        this.router.navigate(['/']);

    }

    /**
     * Удаление выход пользователя на сервере
     */
    userExit(){
        return this.http.delete(this.baseUrl + 'UserController.php?Key=user-exit&Id='+this.user.UserId);
    }

    /**
     * Получение пользователя по Id
     * @param id идентификатор пользователя
     */
    getUserById(id){
        this.http.get<UserToken>(this.baseUrl + 'UserController.php?Key=get-user-by-id&Id='+id).subscribe(user => {
            if(user){
                this.ls.showLoad=false;
                this.user = user[0];
                this.setToken(user[1]);
                this.gs.book.User = {Name:this.user.Name, Email:this.user.Email, Phone:this.user.Phone};
                localStorage.setItem('user',JSON.stringify(this.user));
                return true;
            }
            
        }, error => {
            this.ls.showLoad=false;
            return false;
        }) 
    }

    /**
     * Проверка уникальности email
     * @param email email пользователя
     */
    checkEmail(email){
        return this.http.get<boolean>(this.baseUrl + 'UserController.php?Key=check-email&Email='+email);
    }

    /**
     * Изменение пароля пользователя
     * @param password Объект с UserId, Password, NewPassword
     */
    updatePassword(password){
        return this.http.post(this.baseUrl + 'UserController.php?Key=update-password', password);
    }

    /**
     * Восстановление пароля
     * @param email Почта пользователя
     */
    rememberPassword(email, password){
        return this.http.get(this.baseUrl + 'UserController.php?Key=remember-password&Email='+ email+"&Password="+password);
    }
    /**
     * Генерация пароля
     */
    GenPassword(){
        let alf = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];
        var res = "";
        for(let i = 0; i<10;i++){
            let r = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
            if(r > 3 ){
               if(r>6){
                res+=alf[Math.floor(Math.random() * (alf.length-1 - 0 + 1)) + 0].toUpperCase().toString();
               }
               else{
                res+=alf[Math.floor(Math.random() * (alf.length-1 - 0 + 1)) + 0].toString();
               }
               
            }
            else{
                res+=r.toString();
            }
        }
        return res;

    }
}

