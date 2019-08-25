import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { tap,map } from 'rxjs/operators';

import { Cookie } from 'ng2-cookies/ng2-cookies'
import { Observable, observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'https://chatapi.edwisor.com';
  private socket;
  constructor(public http: HttpClient) {
    this.socket = io(this.url);
  }
  //event to listen
  public verifyUser = () => {
    return Observable.create(observer => {
      this.socket.on('verifyUser', data => {
        observer.next(data);
      });//end socket
    });// end observable
  } //end verifu user
  public onlineUserList = () => {
    return Observable.create((observer) => {
      this.socket.on('online-user-list', userlist => {
        observer.next(userlist);
      })
    })
  }
  public disconnectedSocket = () => {
    return Observable.create(observer => {
      this.socket.on('disconnect', () => {
        observer.next();
      })
    })
  }
  public setuser = (authToken) => {
    this.socket.emit('set-user', authToken)
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = `An error occured ${err.error.message}`;
    }
    else {
      errorMessage = `server returned code: ${err.status} and error message is ${err.message}`;
    }
    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }

  public chatByUserId = (userId) => {

    return Observable.create((observer) => {
      
      this.socket.on(userId, (data) => {

        observer.next(data);

      }); // end Socket

    }); // end Observable

  }

  public SendChatMessage = (chatMsgObject) => {
    console.log('inside ns'+JSON.stringify(chatMsgObject));
    this.socket.emit('chat-msg', chatMsgObject);

  } // end getChatMessage
  public markChatAsSeen = (userDetails) =>
  {
    console.log('inside mark as seen');
    this.socket.emit('mark-chat-as-seen',userDetails);
  }
  public getChat=(senderId,receiverId,skip):Observable<any>=>{
    console.log('inside get chat::'+senderId+'reciever id is'+receiverId+"   "+skip+'   '+Cookie.get('authToken'))
    return this.http.get(`${this.url}/api/v1/chat/get/for/user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}&authToken=${Cookie.get('authToken')}`)
    
  }
  public exitSocket = () =>{


    this.socket.disconnect();


  }// end exit socket

}

