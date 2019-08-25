import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import {FormsModule} from '@angular/forms';
import { FirstCharComponent } from './first-char/first-char.component'


@NgModule({
  declarations: [UserDetailsComponent, FirstCharComponent],
  imports: [
    CommonModule,
   
    FormsModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    UserDetailsComponent,
    FirstCharComponent
  ]
})
export class SharedModule { }
