import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  sections:Section[] = [
    {
      Name:"Пинцеты для наращивания ресниц",
      Image:"../../assets/images/goods/10.jpg"
    },
    {
      Name:"Раздел 2",
      Image:"../../assets/images/goods/176.jpg"
    },
    {
      Name:"Раздел 3",
      Image:"../../assets/images/goods/131.jpg"
    },
    {
      Name:"Раздел 4",
      Image:"../../assets/images/goods/124.jpg"
    },
    {
      Name:"Раздел 5",
      Image:"../../assets/images/goods/169.jpg"
    },
    {
      Name:"Раздел 6",
      Image:"../../assets/images/goods/3.jpg"
    }
  ]
  constructor() { }

  ngOnInit() {
  }
}

export interface Section{
  Name:string;
  Image:string;
}
