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
      Image:"../../assets/images/goods/44.jpg"
    },
    {
      Name:"Раздел 2",
      Image:"../../assets/images/goods/44.jpg"
    },
    {
      Name:"Раздел 3",
      Image:"../../assets/images/goods/44.jpg"
    },
    {
      Name:"Раздел 4",
      Image:"../../assets/images/goods/44.jpg"
    },
    {
      Name:"Раздел 5",
      Image:"../../assets/images/goods/44.jpg"
    },
    {
      Name:"Раздел 6",
      Image:"../../assets/images/goods/44.jpg"
    },
    {
      Name:"Раздел 7",
      Image:"../../assets/images/goods/44.jpg"
    },
    {
      Name:"Раздел 8",
      Image:"../../assets/images/goods/44.jpg"
    },
    {
      Name:"Раздел 9",
      Image:"../../assets/images/goods/44.jpg"
    },
    {
      Name:"Раздел 10",
      Image:"../../assets/images/goods/44.jpg"
    },
    {
      Name:"Раздел 11",
      Image:"../../assets/images/goods/44.jpg"
    }
  ]
  constructor() { }

  ngOnInit() {
  }
  getRow(i){
    console.log((this.sections.length-this.sections.length%i)/i);
    return Math.round((this.sections.length-this.sections.length%i)/i);
  }
}

export interface Section{
  Name:string;
  Image:string;
}
