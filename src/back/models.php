<?php


class Good{
    public $GoodId;
    public $SectionId
    public $Name;
    public $Description;
    public $Price;
    public $Color;
    public $Image;
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
    
    public $User;
    public $Goods;
}

class Section{
    public $SectionId;
    public $Name;
    public $Description;
}
?>