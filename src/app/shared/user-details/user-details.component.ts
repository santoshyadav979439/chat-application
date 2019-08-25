import { Component, OnInit,Input,Output,OnChanges,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass']
})
export class UserDetailsComponent implements OnInit {
  @Input() userFirstName:any;
  @Input() userLastName :String;
  @Input() userStatus: String;
  @Input() messageRead :String;
  public firstChar:String;
  constructor() { }

  ngOnInit() {
    this.firstChar =this.userFirstName[0];
  }

}
