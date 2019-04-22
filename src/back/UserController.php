<?php
require 'repositories.php';

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");

$ctxt = new DataBase();
if(isset($_GET['Key']))
{
    
    switch ($_GET['Key']) {
        case 'get-user-by-id':
            echo json_encode($ctxt->getUserById($_GET['Id']));
            break;
        
        case 'get-user':
            echo json_encode($ctxt->getUser($_GET['Email'], $_GET['Password']));
            break;
        
        case 'add-user':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addUser($b));
            break;
        case 'set-admin':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->setAdmin($_GET['Id'], $_GET['IsAdmin']));
            break;
        case 'get-email':
            echo json_encode($ctxt->getUserEmail($_GET['Id']));
            break;
        case 'update-user-info':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->updateUserInfo($b['UserId'], $b['Phone'], $b['Email']));
            break;
        case 'update-password':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->updatePassword($b['UserId'], $b['Password'], $b['NewPassword']));
            break;
        case 'remember-password':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->rememberPassword($_GET['Email'], $_GET['Password']));
            break;
        case 'check-email':
            echo json_encode($ctxt->checkUser($_GET['Email']));
            break;
        default:
            echo "Введенный ключ несуществует";
        
    }
    
}
else
{  
    echo "Введенные данные некорректны";
}
?>