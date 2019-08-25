import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppService } from 'src/app/app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
public email:String;
public password:any;
  constructor(public router:Router,public toaster:ToastrManager,public appService:AppService) { }

  ngOnInit() {
  }
  public goToSignUp =() =>
  {
this.router.navigate(['/sign-up']);
  }
  public signinFunction=()=>
  {
    if(!this.email)
    {
this.toaster.warningToastr('please enter email');
    }
    else if(!this.password)
    this.toaster.warningToastr('please enter password');
    let data ={
      email:this.email,
      password:this.password
    }
    this.appService.SignInFunction(data).subscribe(
      apiResponse =>{
        console.log('Api response is:::'+JSON.stringify(apiResponse));
        if(apiResponse.status==200)
        {
          Cookie.set('authToken',apiResponse.data.authToken);
          Cookie.set('recieverId',apiResponse.data.userDetails.userId);
          Cookie.set('recieverName',`${apiResponse.data.userDetails.firstName} ${apiResponse.data.userDetails.lastName}`);
          this.appService.setUserInformationFromlocalStorage(apiResponse.data.userDetails);
          this.router.navigate(['/chat']);
        }
        else{
          this.toaster.errorToastr(apiResponse.message);
        }
      },
      err =>
      {
        this.toaster.errorToastr('some error occurred');
      }
    )
  }

}
