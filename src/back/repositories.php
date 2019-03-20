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
            $res[0] = $res[0].$keys[$i].'=?, ';
            $res[1][]=$values[$i];
            
        }
        $res[0]=rtrim($res[0],', ');
        $res[0]=$res[0].' WHERE Id = '.$id;
        
        return $res;
        
    }
    
    //####################Deals Controller#########################
    public function getSections() {
        $sth = $this->db->query("SELECT * FROM sections");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Section');
        return $sth->fetchAll();
    }
    public function addDeal($deal){
        $res = $this->genInsertQuery($deal,"deals");
        $s = $this->db->prepare($res[0]);
        $s->execute($res[1]);
        
        return $this->db->lastInsertId();
    }
    public function addDealGoods($goods){
        for ($i = 0; $i <= count($goods); $i++) {
            $res = $this->genInsertQuery($goods[$i],"dealsgoods");
            $s = $this->db->prepare($res[0]);
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
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
            $u['Password']= md5(md5($u['Password']));
            
            $a = $this->genInsertQuery($u, 'users');
            $s = $this->db->prepare('INSERT INTO users (Email,Name,Password,Phone) VALUES (?,?,?,?);');
            $s->execute($a[1]);
            
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
        for ($i = 0; $i <= count($goods); $i++) {
            $res = $this->genInsertQuery($goods[$i],"goods");
            $s = $this->db->prepare($res[0]);
            if($res[1][0]!=null){
                $s->execute($res[1]);
            }
        }
        return $this->db->lastInsertId();
    }

    public function updateSection($section, $id){
        $a = $this->genUpdateQuery($section['Keys'], $section['Values'], "sections", $id);
        $s = $this->db->prepare($a[0]);
        $s->execute($a[1]);
        return $a;
    }
    public function updateGood($good, $id){
        $a = $this->genUpdateQuery($good['Keys'], $good['Values'], "goods", $id);
        $s = $this->db->prepare($a[0]);
        $s->execute($a[1]);
        return $a;
    }

    //####################Admin Controller##########################
}
?>