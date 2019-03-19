import { Component, OnInit } from '@angular/core';
import { Section } from '../services/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  sections:Section[]
  
  constructor() { }

  ngOnInit() {
  }
}


