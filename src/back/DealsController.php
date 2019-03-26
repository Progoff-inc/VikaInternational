<?php
require 'repositories.php';
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");

$ctxt = new DataBase();
if(isset($_GET['Key']))
{
    
    switch ($_GET['Key']) {
        case 'get-sections':
            echo json_encode($ctxt->getSections(false));
            break;
        case 'get-sales':
            echo json_encode($ctxt->getSales());
            break;
        case 'add-sale':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addSale($b));
            break;
        case 'update-sale':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->updateSale($b));
            break;
        case 'get-section-goods':
            echo json_encode($ctxt->getSectionGoods($_GET['Id']));
            break;
        case 'get-good':
            echo json_encode($ctxt->getGood($_GET['Id']));
            break;
            
        case 'remove-section':
            echo json_encode($ctxt->removeSection($_GET['Id']));
            break;
            
        case 'remove-good':
            echo json_encode($ctxt->removeGood($_GET['Id']));
            break;
            
        case 'remove-sale':
            echo json_encode($ctxt->removeSale($_GET['Id']));
            break;
            
            
        case 'get-section':
            echo json_encode($ctxt->getSection($_GET['Id']));
            break;
       
        case 'add-deal':
            $b = json_decode(file_get_contents('php://input'), true);  
            echo json_encode($ctxt->addDeal($b));
            break;
        case 'add-deal-goods':
            $b = json_decode(file_get_contents('php://input'), true);  
            echo json_encode($ctxt->addDealGoods($b));
            break;
        case 'add-section':
            $b = json_decode(file_get_contents('php://input'), true); 
            echo json_encode($ctxt->addSection($b));
            break;
        case 'get-admin-sections':
            echo json_encode($ctxt->getSections(true));
            break;
        case 'add-section-goods':
            $b = json_decode(file_get_contents('php://input'), true); 
            echo json_encode($ctxt->addSectionGoods($b));
            break;
        case 'update-section':
            $b = json_decode(file_get_contents('php://input'), true); 
            echo json_encode($ctxt->updateSection($b, $_GET['Id']));
            break;
        case 'update-goods':
            $b = json_decode(file_get_contents('php://input'), true); 
            echo json_encode($ctxt->updateGoods($b));
            break;
        case 'upload-file':
            $inp = json_decode(file_get_contents('php://input'), true);
            echo json_encode(array($ctxt->uploadFile($_GET['Id'], $_FILES, $_GET['Type'])));
            break;
        default:
            echo "Введенный ключ несуществует";
        
    }
    
}
else
{  
    echo "Введенные данные некорректны";
}
// if(isset($_GET['Key']))
// {
    
//     $q = $db->query('SELECT * FROM exam_marks');
//     $res = [];
//     while ($row = $q->fetch()) {
//         $res[] = new Entree($row['MARK']*1, $row['EXAM_DATE']);
        
//     }
//     echo json_encode($res,true);
// }
// else
// {  
//     echo "Введенные данные некорректны";
// }
?>