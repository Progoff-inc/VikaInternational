import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.less']
})
export class ProgressBarComponent implements OnInit {
  @Input() parent;
  steps = [1,2,3,4,5];
  constructor() { }

  ngOnInit() {
  }
  chStep(i){
    if (i<=this.parent.curStep){
      this.parent.curStep=i;
    }
  }

}
