import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import {bootstrap} from 'bootstrap';
import { ToastrModule } from 'ng6-toastr-notifications';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppService} from './app.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChatModule,
    UserModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
