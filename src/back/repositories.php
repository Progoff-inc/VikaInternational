<?php
require 'models.php';
class DataBase {
    //$this->db = new PDO('mysql:host=localhost;dbname=nomokoiw_portal;charset=UTF8','nomokoiw_portal','KESRdV2f');
    public $db;
    public function __construct()
    {
        //$this->db = new PDO('mysql:host=localhost;dbname=myblog;charset=UTF8','nlc','12345');
        $this->db = new PDO('mysql:host=localhost;dbname=vikaoskina_vi;charset=UTF8','vikaoskina_vi','0nvNFp1e');
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
        $path = explode('back/',$filelink);
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
            if($c->Type=='good'){
                $c->Good = $this->getGood($c->GoodId);
            }else{
                $c->Good = $this->getSale($c->GoodId);
            }
            
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
    
    public function getDeal($id) {
        $s = $this->db->prepare("SELECT * FROM deals WHERE DealId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Deal');
        
        return $s->fetch();
    }
    public function getSale($id) {
        $s = $this->db->prepare("SELECT * FROM sales WHERE SaleId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Sale');
        
        return $s->fetch();
    }
    

    
    public function addDeal($deal){
        $res = $this->genInsertQuery($deal,"deals");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        $id = $this->db->lastInsertId();
        
        
        return $id;
    }
    
    public function addDealGoods($dealsgoods){
        $cart="";
         $str = file_get_contents("NotifyMail.html");
         $did = "";
         $sum = 0;
        for ($i = 0; $i < count($dealsgoods); $i++) {
            $did = $dealsgoods[$i]['DealId'];
            $g = $this->getGood($dealsgoods[$i]['GoodId']);
            $cart.="<tr><td style='padding:5px 10px'><img src='".$g->Image."' style='width:100%'></td><td style='padding:5px 10px'>".$g->Name."</td><td style='padding:5px 10px'>".$g->Color."</td><td style='padding:5px 10px'>".$dealsgoods[$i]['Count']."</td><td style='padding:5px 10px'>".$g->Price."</td></tr>";
            $res = $this->genInsertQuery($dealsgoods[$i],"dealsgoods");
            $sum+=$dealsgoods[$i]['Count']*$g->Price;
            $s = $this->db->prepare($res[0]);
            if($res[1][0]!=null){
                $s->execute($res[1]);
            }
        }
        $str = str_replace ( '#dealId#' , $did, $str);
        $str = str_replace ( '#sum#' , $sum, $str);
        $str = str_replace ( '#cart#' , $cart, $str);
        $subject = "Оформление заказа";
        $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        $did = $this->getDeal($did);
        mail($this->getUserEmail($did->UserId), $subject, $str, $headers); 
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
        $token = null;
        if($u){
            $token = md5($u->Password.rand(1000,9999));
            $this->setToken($u->UserId, $token);
            $u->Password = null;
            $u->Deals = $this->getUserDeals($u->UserId);
        }
        return array($u, $token);
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

    public function updateUserInfo($token, $id, $phone, $email){
        if($this->checkToken($token, $id) && $this->checkUser($email)){
            $s = $this->db->prepare("UPDATE users SET Phone=?, Email=? WHERE UserId=?");
            $s->execute(array($phone, $email, $id));
            return true;
        }
        else{
            return false;
        }
    }
    
    public function updatePassword($token, $id, $p, $np){
        if($this->checkToken($token, $id) && $this->getUserPassword($id)==md5(md5($p))){
            $s = $this->db->prepare("UPDATE users SET Password=? WHERE UserId=?");
            $s->execute(array(md5(md5($np)), $id));
            return true;
        }else{
            return false;
        }
    }
    
    public function rememberPassword($email, $pass){
        if(!$this->checkUser($email)){
            
            $s = $this->db->prepare("UPDATE users SET Password=? WHERE Email=?");
            $s->execute(array(md5(md5($pass)), $email));
            $subject = "Восстановление пароля"; 
            
            $message = "<h2>Для входа в аккаунт был сгенерирован новый пароль.</h2>
            </br> <p><b>Ваш логин: </b>$email<b></br>Ваш пароль: </b>$pass</br></p></br>
            <p>Пароль можно изменить в личном кабинете.</p> </br>";
            
            $headers  = "Content-type: text/html; charset=utf-8 \r\n";
            
            mail($email, $subject, $message, $headers);
            
            return true;
        }else{
            return false;
        }
    }
    private function getUserPassword($id){
        $s = $this->db->prepare("SELECT Password FROM users WHERE UserId=?");
        $s->execute(array($id));
        return $s->fetch()['Password'];
    }
    public function getUserById($id){
        $s = $this->db->prepare("SELECT * FROM users WHERE UserId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'User');
        $u=$s->fetch();
        $token = md5($u->Password.rand(1000,9999));
        $this->setToken($u->UserId, $token);
        $u->Password = null;
        $u->Deals = $this->getUserDeals($u->UserId);
        
        return array($u,$token);
    }
    
    public function getUserByToken($token){
        $s = $this->db->prepare("SELECT * FROM users WHERE Token=?");
        $s->execute(array($token));
        $s->setFetchMode(PDO::FETCH_CLASS, 'User');
        $u=$s->fetch();
        
        return $u;
    }
    
    private function setToken($uid, $token){
        $s = $this->db->prepare('UPDATE users SET Token=? WHERE UserId=?');
        $s->execute(array($token, $uid));
    }
    
    public function addUser($u){
        
        if($this->checkUser($u['Email'])){
            $psd=$u['Password'];
            $em=$u['Email'];
            $u['Password']= md5(md5($u['Password']));
            $str = file_get_contents("RegistrationMail.html");
            $str = str_replace ( '#login#' , $em, $str);
            $str = str_replace ( '#password#' , $psd, $str);
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
            
            mail($em, $subject, $str, $headers); 
            return $this->getUserById($this->db->lastInsertId());
        }
        else{
            return false;
        }
        
    }
    
    public function userExit($uid){
        $this->setToken($uid, null);
    }

    public function checkUser($e){
        $s = $this->db->prepare("SELECT * FROM users WHERE Email=?");
        $s->execute(array($e));
        return count($s->fetchAll())==0;
    }
    
    private function checkToken($token, $uid=0, $admin=false){
        $u = $this->getUserByToken($token);
        if($uid>0 && $uid != $u->UserId){
            return false;
        }
        if($u->IsAdmin){
            return true;
        }
        if($admin){
            return false;
        }
        return true;
    }
    
    
    
    //####################User Controller###########################
    
    //####################Admin Controller##########################

    public function addSection($token, $section){
        if($this->checkToken($token, 0, true)){
            $res = $this->genInsertQuery($section,"sections");
            $s = $this->db->prepare($res[0]);
            if($res[1][0]!=null){
                $s->execute($res[1]);
            }
            
            
            return $this->db->lastInsertId();
        }else{
            return false;
        }
        
    }
    public function addSectionGoods($token, $goods){
        if($this->checkToken($token, 0, true)){
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
        }else{
            return false;
        }
        
    }
    
    public function uploadFile($token, $pid, $files, $t){
        if($this->checkToken($token, 0, true)){
            $img=$this->getImage($pid, $t);
            if($img){
                $this->removeFile($img);
            }
            $url = "http://vikaoskina.beget.tech/back/";
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
        }else{
            return false;
        }
        
    }
    
    public function addSale($token, $sale){
        if($this->checkToken($token, 0, true)){
            $res = $this->genInsertQuery($sale,"sales");
            $s = $this->db->prepare($res[0]);
            if($res[1][0]!=null){
                $s->execute($res[1]);
            }
            
            
            return $this->db->lastInsertId();
        }else{
            return false;
        }
        
    }
    public function removeSale($token, $id){
        if($this->checkToken($token, 0, true)){
            $img=$this->getImage($id, 'sale');
            if($img){
                $this->removeFile($img);
            }
            $s = $this->db->prepare("DELETE FROM sales WHERE SaleId=?");
            $s->execute(array($id));
            
            
            return true;
        }else{
            return false;
        }
    }
    public function removeSection($token, $id){
        if($this->checkToken($token, 0, true)){
            $img=$this->getImage($id, 'section');
            if($img){
                $this->removeFile($img);
            }
            $s = $this->db->prepare("SELECT * FROM goods WHERE SectionId=?");
            $s->execute(array($id));
            $s->setFetchMode(PDO::FETCH_CLASS, 'Good');
            while($c = $s->fetch()){
                $img=$this->getImage($c->GoodId, 'good');
                if($img){
                    $this->removeFile($img);
                }
            }
            $s = $this->db->prepare("DELETE FROM sections WHERE SectionId=?");
            $s->execute(array($id));
            
            
            return true;
        }else{
            return false;
        }
    }
    public function removeGood($token, $id){
        if($this->checkToken($token, 0, true)){
            $img=$this->getImage($id, 'good');
            if($img){
                $this->removeFile($img);
            }
            $s = $this->db->prepare("DELETE FROM goods WHERE GoodId=?");
            $s->execute(array($id));
            
            
            return true;
        }else{
            return false;
        }
    }
    public function updateSale($token, $sale){
        if($this->checkToken($token, 0, true)){
            $id=$sale['SaleId'];
            unset($sale['SaleId']);
            $a = $this->genUpdateQuery(array_keys($sale), array_values($sale), "sales", $id);
            $s = $this->db->prepare($a[0]);
            $s->execute($a[1]);
            return $a;
        }else{
            return false;
        }
    }

    public function updateSection($token, $section, $id){
        if($this->checkToken($token, 0, true)){
            $a = $this->genUpdateQuery(array_keys($section), array_values($section), "sections", $id);
            $s = $this->db->prepare($a[0]);
            $s->execute($a[1]);
            return $a;
        }else{
            return false;
        }
    }
    public function updateGoods($token, $goods){
        if($this->checkToken($token, 0, true)){
            for ($i = 0; $i <= count($goods); $i++) {
                $id=$goods[$i]['GoodId'];
                unset($goods['GoodId']);
                $a = $this->genUpdateQuery(array_keys($goods[$i]), array_values($goods[$i]), "goods", $id);
                $s = $this->db->prepare($a[0]);
                $s->execute($a[1]);
            }
            
            return $a;
        }else{
            return false;
        }
    }
    

    //####################Admin Controller##########################
}
?>