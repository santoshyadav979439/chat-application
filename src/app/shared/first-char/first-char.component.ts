import { Component,OnChanges, OnInit, Input,EventEmitter, SimpleChanges, Output } from '@angular/core';

@Component({
  selector: 'app-first-char',
  templateUrl: './first-char.component.html',
  styleUrls: ['./first-char.component.sass']
})
export class FirstCharComponent implements OnInit {
@Input() userName:any;
@Input() userBg :String;
@Input() userColor: String;
@Output()
notify:EventEmitter<String>  = new EventEmitter();
public firstChar:String;
private _name:String= '';
  constructor() { }

  ngOnInit() {
    this._name=this.userName;
    this.firstChar =this._name[0];
  }
ngOnChanges(changes:SimpleChanges)
{
  let name= changes.userName;
  this._name= name.currentValue;
  this.firstChar = this._name[0];
}
nameClicked()
{
  this.notify.emit(this.userName);
}
}
