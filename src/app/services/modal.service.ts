import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TemplateRef, Injectable } from '@angular/core';

@Injectable()
export class ModalService{
    modalRef: BsModalRef;
    modal:TemplateRef<any>;
    type:string;
    inpt:any;
    
    constructor(private modalService: BsModalService){

    }
    
    close(){
        this.type = "";
        this.inpt = undefined;
        this.modalRef.hide();
    }
    open(type, inpt?){
        
        this.type = type;
        this.inpt = inpt?inpt:undefined;
        console.log(inpt);
        this.modalRef = this.modalService.show(this.modal);
    }
}