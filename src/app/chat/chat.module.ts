import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { RouterModule,Route } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RemoveSpecialCharPipe } from '../shared/pipe/remove-special-char.pipe';
import { ChatRouteGaurdService } from './chat-route-gaurd.service';

@NgModule({
  declarations: [ChatBoxComponent,RemoveSpecialCharPipe],
  imports: [
    CommonModule,
    RouterModule.forChild([
{path:'chat',component:ChatBoxComponent,canActivate:[ChatRouteGaurdService]}
    ]),
    SharedModule,
  ],
  providers: [ChatRouteGaurdService]
})
export class ChatModule { }
