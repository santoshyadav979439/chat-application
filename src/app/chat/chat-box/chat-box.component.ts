import { Component, OnInit,ViewContainerRef, ViewChild, ElementRef  } from '@angular/core';
import { AppService } from './../../app.service';
import { SocketService } from './../../socket.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [SocketService]
})
export class ChatBoxComponent implements OnInit {
  @ViewChild('scrollMe', { static: false }) 
  
  public scrollMe: ElementRef;
  public authToken: any;
  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  public userList: any = [];
  public disconnectedSocket: boolean;
  public messageText: any = [];//stores current message list displays in chat box
  public messageList: any;
  scrollToChatTop: boolean;
  pageValue: number;
  loadingPriviouschat: boolean;
  constructor(public SocketService: SocketService, public AppService: AppService, public router: Router, public toaster: ToastrManager) {
   // this.recieverId = Cookie.get('recieverId');
    //this.receiverName = Cookie.get('receiverName');
  }

  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.userInfo = this.AppService.getUserInformationFromlocalStorage();
    this.receiverId = Cookie.get('recieverId');
    this.receiverName = Cookie.get('receiverName');

    
    if(this.receiverId!=null && this.receiverId!=undefined && this.receiverId!='' )
    {
      this.userSelectedToChat(this.receiverId,this.receiverName);
    }
    this.checkStatus();
    this.verifyUserConfirmation();
    this.getOnlineUserList();
    this.getMessageFromAUser();
  }

  public checkStatus = () => {
    let authToken = Cookie.get('authToken');
    if (authToken == undefined || authToken == '' || authToken == null) {
      this.router.navigate(['/']);
      return false;
    }
    else
      return true;

  }
  public verifyUserConfirmation = () => {
    this.SocketService.verifyUser().subscribe(
      (data) => {
        this.disconnectedSocket = false;
        this.SocketService.setuser(this.authToken);
        this.getOnlineUserList();

      },
      (err) => {
        this.disconnectedSocket = true;
        this.toaster.errorToastr('some error occurred');
        this.router.navigate(['/']);
      }
    )
  }
  public getOnlineUserList = () => {
    this.SocketService.onlineUserList().subscribe(
      (userList) => {
        this.userList = [];
        for (let x in userList) {
          let temp = { 'userId': x, 'name': userList[x], 'unread': 0, 'chatting': false };
          this.userList.push(temp);
          console.log(temp);
        }
      }
    )
  }
  public sendMessageUsingKeypress: any = (event: any) => {

    if (event.keyCode === 13) { // 13 is keycode of enter.

      this.sendMessage();

    }

  } // end sendMessageUsingKeypress
  public sendMessage = () => {
    if (this.messageText) {
      let chatMsgObject = {
        senderName: this.userInfo.firstName + " " + this.userInfo.lastName,
        senderId: this.userInfo.userId,
        receiverName: Cookie.get('receiverName'),
        receiverId: Cookie.get('receiverId'),
        message: this.messageText,
        createdOn: new Date()
      } // end chatMsgObject
      console.log(chatMsgObject);
      this.SocketService.SendChatMessage(chatMsgObject)
      this.pushToChatWindow(chatMsgObject)
    }
    else {
      this.toaster.warningToastr('text message can not be empty');
    }
  }
  public pushToChatWindow = (data) => {
    console.log('Inside to push to chaT BOX')
    this.messageText = '';
    this.messageList.push(data);
    this.scrollToChatTop = false;
  }
  public getMessageFromAUser :any =()=>{

    this.SocketService.chatByUserId(this.userInfo.userId)
    .subscribe((data)=>{
     
      console.log('data is::'+JSON.stringify(data));
      (this.receiverId==data.senderId)?this.messageList.push(data):'';

      this.toaster.successToastr(`${data.senderName} says : ${data.message}`)

      this.scrollToChatTop=false;

    });//end subscribe

}// end get message from a user // end get message from a user // end get message from a user 
  public userSelectedToChat: any = (id, name) => {

    console.log("setting user as active") 

    // setting that user to chatting true   
    this.userList.map((user)=>{
        if(user.userId==id){
          user.chatting=true;
        }
        else{
          user.chatting = false;
        }
    })

    Cookie.set('receiverId', id);

    Cookie.set('receiverName', name);


    this.receiverName = name;

    this.receiverId = id;

    this.messageList = [];

    this.pageValue = 0;

    let chatDetails = {
      userId: this.userInfo.userId,
      senderId: id
    }


    this.SocketService.markChatAsSeen(chatDetails);

    this.getPreviousChatWithAUser();

  } // end userBtnClick function
 public  getPreviousChatWithAUser=()=> {
   console.log('inside getPreviousChatWithAUser');
    let previousData =(this.messageList.length>0)? this.messageList.slice():[];
    this.SocketService.getChat(this.userInfo.userId,this.receiverId,this.pageValue*10).subscribe(
      (apiResponse) =>
      {
        console.log('api response is::'+JSON.stringify(apiResponse))
if(apiResponse.status==200)
{
  this.messageList=apiResponse.data.concat(previousData)
  console.log('previous messages are::::::::'+JSON.stringify(this.messageList))
}
else{
  this.toaster.warningToastr('There is no more messages is available')
}
      }
    )
  }
  public showUserName =(name:String)=>{
this.toaster.successToastr('You are chatting with'+name);
  }
  public loadEarlierPageOfChat=()=>
  {
    this.loadingPriviouschat =true;
    this.pageValue++;
    this.scrollToChatTop =true;
    this.getPreviousChatWithAUser();

  }
  public logout: any = () => {

    this.AppService.logout()
      .subscribe((apiResponse) => {

        if (apiResponse.status === 200) {
          console.log("logout called")
          Cookie.delete('authtoken');

          Cookie.delete('receiverId');

          Cookie.delete('receiverName');

          this.SocketService.exitSocket()

          this.router.navigate(['/']);

        } else {
          this.toaster.errorToastr(apiResponse.message)

        } // end condition

      }, (err) => {
        this.toaster.errorToastr('some error occured')


      });

  } // end logout
}
