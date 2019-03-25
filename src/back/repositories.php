<?php
require 'models.php';
class DataBase {
    //$this->db = new PDO('mysql:host=localhost;dbname=nomokoiw_portal;charset=UTF8','nomokoiw_portal','KESRdV2f');
    public $db;
    public function __construct()
    {
        //$this->db = new PDO('mysql:host=localhost;dbname=myblog;charset=UTF8','nlc','12345');
        $this->db = new PDO('mysql:host=localhost;dbname=nomokoiw_vi;charset=UTF8','nomokoiw_vi','lCtw&9m8');
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
    private function genInsertQuery($ins, $t){
        $res = array('INSERT INTO '.$t.' (',array());
        $q = '';
        for ($i = 0; $i < count(array_keys($ins)); $i++) {
            $res[0] = $res[0].array_keys($ins)[$i].',';
            $res[1][]=$ins[array_keys($ins)[$i]];
            $q=$q.'?,';
            
        }
        $res[0]=rtrim($res[0],',');
        $res[0]=$res[0].') VALUES ('.rtrim($q,',').');';
        
        return $res;
        
    }
    private function genUpdateQuery($keys, $values, $t, $id){
        $res = array('UPDATE '.$t.' SET ',array());
        $q = '';
        for ($i = 0; $i < count($keys); $i++) {
            if($values[$i]!='now()'){
                $res[0] = $res[0].$keys[$i].'=?, ';
                $res[1][]=$values[$i];
            }
            else{
                $res[0] = $res[0].$keys[$i].'=now(), ';
            }
            
            
        }
        $res[0]=rtrim($res[0],', ');
        $res[0]=$res[0].' WHERE '.rtrim($t,'s').'Id = '.$id;
        
        return $res;
        
    }
    
    private function removeFile($filelink){
        $path = explode('vi/',$filelink);
        unlink($path[1]);
        
    }
    
    //####################Deals Controller#########################
    public function getSections($all) {
        $sth = $this->db->query("SELECT * FROM sections");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Section');
        if($all){
            $res = [];
            while($c = $sth->fetch()){
                $c->Goods = $this->getSectionGoods($c->SectionId);
                $res[] = $c;
            }
            return $res;
        }
        else{
            return $sth->fetchAll();
        }
        
    }
    
    public function getSales() {
        $sth = $this->db->query("SELECT * FROM sales");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Sale');
        return $sth->fetchAll();
        
    }
    
    public function getSection($id){
        $s = $this->db->prepare("SELECT * FROM sections WHERE SectionId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Section');
        $u=$s->fetch();
        $u->Goods = $this->getSectionGoods($u->SectionId);
        return $u;
    } 
    
    public function getSectionGoods($id) {
        $s = $this->db->prepare("SELECT * FROM goods WHERE SectionId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Good');
        
        return $s->fetchAll();
    }
    public function getDealGoods($id) {
        $s = $this->db->prepare("SELECT * FROM dealsgoods WHERE DealId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'CartItem');
        $res = [];
        while($c = $s->fetch()){
            $c->Good = $this->getGood($c->GoodId);
            $res[] = $c;
        }
        return $res;
    }
    public function getGood($id) {
        $s = $this->db->prepare("SELECT * FROM goods WHERE GoodId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Good');
        
        return $s->fetch();
    }
    

    
    public function addDeal($deal){
        $res = $this->genInsertQuery($deal,"deals");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        $id = $this->db->lastInsertId();
        mail($this->getUserEmail($deal['UserId']), "Привет!", "Тестируем письмо! \n Номер заказа: $id"); 
        return $id;
    }
    
    public function addDealGoods($dealsgoods){
        for ($i = 0; $i < count($dealsgoods); $i++) {
            $res = $this->genInsertQuery($dealsgoods[$i],"dealsgoods");
            $s = $this->db->prepare($res[0]);
            if($res[1][0]!=null){
                $s->execute($res[1]);
            }
        }
        return true;
    }
    
    public function getUserEmail($id){
        $s = $this->db->prepare("SELECT Email FROM users WHERE UserId=?");
        $s->execute(array($id));
        return $s->fetch()['Email'];
    }
    
    public function getImage($id, $t){
        $tid=ucfirst($t)."Id";
        $t .="s";
        $s = $this->db->prepare("SELECT Image FROM $t WHERE $tid=?");
        $s->execute(array($id));
        return $s->fetch()['Image'];
    }
    
    //####################Cars Controller#########################
    
    
    
    //####################User Controller###########################
    
    public function getUser($e, $p){
        $s = $this->db->prepare("SELECT * FROM users WHERE Email=? and Password=?");
        $s->execute(array($e, md5(md5($p))));
        $s->setFetchMode(PDO::FETCH_CLASS, 'User');
        $u=$s->fetch();
        if($u){
            $u->Password = null;
            $u->Deals = $this->getUserDeals($u->UserId);
        }
        return $u;
    } 
    public function getUserDeals($id) {
        $s = $this->db->prepare("SELECT * FROM deals WHERE UserId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Deal');
        $res = [];
        while($d = $s->fetch()){
            $d->Goods = $this->getDealGoods($d->DealId);
            $res[] = $d;
        }
        return $res;
    }

    public function setAdmin($id, $isa){
        $s = $this->db->prepare("UPDATE users SET IsAdmin=? WHERE UserId=?");
        $s->execute(array($isa === 'true',$id));
        return array($isa, $id);
    }

    public function updateUserInfo($id, $phone, $email){
        if($this->checkUser($email)){
            $s = $this->db->prepare("UPDATE users SET Phone=?, Email=? WHERE UserId=?");
            $s->execute(array($phone, $email, $id));
            return true;
        }
        else{
            return false;
        }
    }

    public function getUserById($id){
        $s = $this->db->prepare("SELECT * FROM users WHERE UserId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'User');
        $u=$s->fetch();
        $u->Password = null;
        $u->Deals = $this->getUserDeals($u->UserId);
        return $u;
    }
    
    public function addUser($u){
        
        if($this->checkUser($u['Email'])){
            $psd=$u['Password'];
            $em=$u['Email'];
            $u['Password']= md5(md5($u['Password']));
            
            $a = $this->genInsertQuery($u, 'users');
            $s = $this->db->prepare('INSERT INTO users (Email,Name,Password,Phone) VALUES (?,?,?,?);');
            $s->execute($a[1]);
            //mail($em, "Регистрация", "Вы успешно зарегистрировались на сайте VikaInternational\n\nВаш логин: $em\n Ваш пароль: $psd");
            
            
            $subject = "Заголовок письма"; 
            
            $message = "<h2>Вы успешно зарегистрировались на сайте VikaInternational</h2>
            </br> <b>Ваш логин: </b>$em </br><b>Ваш пароль: </b>$psd</br>";
            
            $headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
            //$headers .= "From: От кого письмо <from@example.com>\r\n"; 
            //$headers .= "Reply-To: reply-to@example.com\r\n"; 
            
            mail($em, $subject, $message, $headers); 
            return $this->getUserById($this->db->lastInsertId());
        }
        else{
            return false;
        }
        
    }

    public function checkUser($e){
        $s = $this->db->prepare("SELECT * FROM users WHERE Email=?");
        $s->execute(array($e));
        return count($s->fetchAll())==0;
    }
    
    
    
    //####################User Controller###########################
    
    //####################Admin Controller##########################

    public function addSection($section){
        $res = $this->genInsertQuery($section,"sections");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        
        
        return $this->db->lastInsertId();
    }
    public function addSectionGoods($goods){
        $result = [];
        
        for ($i = 0; $i < count($goods); $i++) {
            $res = $this->genInsertQuery($goods[$i],"goods");
            $s = $this->db->prepare($res[0]);
            if($res[1][0]!=null){
                $s->execute($res[1]);
            }
            
            $goods[$i]['GoodId']=$this->db->lastInsertId();
            
            $result[]=$goods[$i];
        }
        return $result;
    }
    
    public function uploadFile($pid, $files, $t){
        $img=$this->getImage($pid, $t);
        if($img){
            $this->removeFile($img);
        }
        $url = "http://client.nomokoiw.beget.tech/vi/";
        $n = basename($t."_".$pid."_".$files['Data']['name']);
        $tid=ucfirst($t)."Id";
        $t .="s";
        $d = "Files/$n";
        if(file_exists("Files")){
            
            if(move_uploaded_file($files['Data']['tmp_name'], $d)){
                $s = $this->db->prepare("UPDATE $t SET Image=? WHERE $tid=?");
                $s->execute(array($url.$d, $pid));
                return($url.$d);
            }else{
                return($_FILES['Data']['tmp_name']);
            }
        }else{
            mkdir("Files");
            if(move_uploaded_file($files['Data']['tmp_name'], $d)){
                $s = $this->db->prepare("UPDATE $t SET Image=? WHERE $tid=?");
                $s->execute(array($url.$d, $pid));
                return($url.$d);
            }else{
                return($_FILES['Data']['tmp_name']);
            }
        }
        
        return false;
    }
    
    public function addSale($sale){
        $res = $this->genInsertQuery($sale,"sales");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        
        
        return $this->db->lastInsertId();
    }
    public function removeSale($id){
        $img=$this->getImage($id, 'sale');
        if($img){
            $this->removeFile($img);
        }
        $s = $this->db->prepare("DELETE FROM sales WHERE SaleId=?");
        $s->execute(array($id));
        
        
        return true;
    }
    public function removeSection($id){
        $img=$this->getImage($id, 'section');
        if($img){
            $this->removeFile($img);
        }
        $s = $this->db->prepare("SELECT * FROM goods WHERE SectionId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Good');
        while($c = $s->fetch()){
            $img=$this->getImage($c->GoodId, 'goods');
            if($img){
                $this->removeFile($img);
            }
        }
        $s = $this->db->prepare("DELETE FROM sections WHERE SectionId=?");
        $s->execute(array($id));
        
        
        return true;
    }
    public function removeGood($id){
        $img=$this->getImage($id, 'good');
        if($img){
            $this->removeFile($img);
        }
        $s = $this->db->prepare("DELETE FROM goods WHERE GoodId=?");
        $s->execute(array($id));
        
        
        return true;
    }
    public function updateSale($sale){
        $id=$sale['SaleId'];
        unset($sale['SaleId']);
        $a = $this->genUpdateQuery(array_keys($sale), array_values($sale), "sales", $id);
        $s = $this->db->prepare($a[0]);
        $s->execute($a[1]);
        return $a;
    }

    public function updateSection($section, $id){
        
        $a = $this->genUpdateQuery(array_keys($section), array_values($section), "sections", $id);
        $s = $this->db->prepare($a[0]);
        $s->execute($a[1]);
        return $a;
    }
    public function updateGoods($goods){
        for ($i = 0; $i <= count($goods); $i++) {
            $id=$goods[$i]['GoodId'];
            unset($goods['GoodId']);
            $a = $this->genUpdateQuery(array_keys($goods[$i]), array_values($goods[$i]), "goods", $id);
            $s = $this->db->prepare($a[0]);
            $s->execute($a[1]);
        }
        
        return $a;
    }
    

    //####################Admin Controller##########################
}
?>