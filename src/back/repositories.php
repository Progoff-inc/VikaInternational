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
    
    //####################Cars Controller#########################
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
        $u->Password = null;
        $u->Deals = $this->getUserDeals($u->UserId);
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
        $s = $this->db->prepare("UPDATE users SET IsAdmin=? WHERE Id=?");
        $s->execute(array($isa === 'true',$id));
        return array($isa, $id);
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
    
    public function getUserBooks($id) {
        $s = $this->db->prepare("SELECT * FROM books WHERE UserId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Book');
        $books =[];
        while($b = $s->fetch()){
            $b->Car = $this->getReportCar($b->CarId);
            $b->User = $this->getReportUser($b->UserId);
            $books[] = $b;
        }
        return $books;
    }
    
    public function addUser($u){

        $a = $this->genInsertQuery($u);
        $s = $this->db->prepare($a[0]);
        $s->execute($a[1]);
        
        return $this->db->lastInsertId();
    }
    
    
    
    //####################User Controller###########################
    
    //####################Messager Controller###########################
    
    public function createTopic($uid){
        $s = $this->db->query("SELECT Id FROM users WHERE IsAdmin=true");
        $rid = $s->fetch()[0];
        $s = $this->db->prepare("INSERT INTO topics (UserId, UserReciverId, ModifyDate) VALUES (?,?,now())");
        $s->execute(array($uid, $rid));
        
        return $this->getUserTopics($rid);
    }
    public function saveMessage($uid, $tid, $t){
        $s = $this->db->prepare("INSERT INTO messages (UserId, TopicId, Text, CreateDate) Values (?,?,?,now())");
        $s->execute(array($uid, $tid, $t));
        
        return $this->getMessageById($this->db->lastInsertId());
    } 
    
    public function getMessageById($id) {
        $s = $this->db->prepare("SELECT Id, TopicId, UserId, Text, CreateDate FROM messages WHERE Id=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Message');
        $u=$s->fetch();
        return $u;
    }
    
    public function getUserTopics($id) {
        $s = $this->db->prepare("SELECT * FROM topics WHERE UserId=? OR UserReciverId=?");
        $s->execute(array($id, $id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Topic');
        $topics = [];
        while($r = $s->fetch()){
            $r->User = $this->getReportUser($r->UserId);
            $r->UserReciver = $this->getReportUser($r->UserReciverId);
            $r->Messages = $this->getMessages($r->Id);
            $topics[] = $r;
        }
        return $topics;
    }
    
    public function getMessages($tid){
        $s = $this->db->prepare("SELECT * FROM messages WHERE TopicId=?");
        $s->execute(array($tid));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Message');
        return $s->fetchAll();
    }
    
    public function addComment($uid, $fid, $t){
        $s = $this->db->prepare("INSERT INTO comments (UserId, FeedBackId, Text, CreateDate) VALUES (?,?,?,now())");
        $s->execute(array($uid, $fid, $t));
        return $this->getCommentById($this->db->lastInsertId());
    }
    
    public function getCommentById($id){
        $s = $this->db->prepare("SELECT Id, FeedBackId, UserId, Text, CreateDate FROM comments WHERE Id=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Comment');
        $u=$s->fetch();
        $u->User = $this->getUserById($u->UserId);
        $u->Likes = $this->getLikes($u->Id,2);
        return $u;
    }
    //####################Messager Controller###########################
}
?>