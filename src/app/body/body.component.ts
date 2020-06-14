import { Component, OnInit } from '@angular/core';
declare function getData(): any;


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor() {
   
  }
    
    

  ngOnInit(): void {
       this.insertable = getData();
      console.log(this.insertable);
  }
    
    
    insertable;
    
    //global variables for testing:
    number = "01";
    title = "Fill Out A Profile";
    paragraph = "We only want you to get games and gear that you'll love, so we'll ask for your preferences up front.";
    

}
