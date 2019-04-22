import { Component, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnDestroy {
  title = 'VikaInternational';
  constructor(private us:UserService){
  }

  ngOnDestroy(){
    this.us.userExit().subscribe(()=>{});
  }
}
