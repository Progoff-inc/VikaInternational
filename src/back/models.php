<?php


class Good{
    public $GoodId;
    public $Name;
    public $Description;
    public $Price;
    public $Color;
    public $Image;
    public $Photoes;
}
    
class CartItem{
    public $DealId;
    public $GoodId;
    public $Count;

    public $Good;
}
    
class User{
    public $UserId;
    public $Name;
    public $Email;
    public $Password;
    public $Phone;
    public $IsAdmin;

    public $Deals;
}
    
class Deal{
    public $DealId;
    public $UserId;
    public $CreateDate;
    public $ShowGoods; //не приходит с базы не надо нигде заполнять
    
    public $User;
    public $Goods;
}
?>