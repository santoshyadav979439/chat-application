import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
public firstName:any;
public lastName:any;
public mobile:any;
public email:any;
public password:any;
public apiKey:any;

  constructor(public toastr: ToastrManager,public router:Router,public appservice:AppService) { }

  ngOnInit() {
  }
public goToSignIn :any = () =>
{
this.router.navigate(['/']);
}
public signupFunction:any = () =>
{
  if(!this.firstName)
  {
    this.toastr.warningToastr('enter first name');
  }
  else if(!this.lastName)
  {
   this.toastr.warningToastr('enter last name'); 
  }
  else if(!this.mobile)
  {
   this.toastr.warningToastr('enter mobile number'); 
  }
  else if(!this.email)
  {
   this.toastr.warningToastr('enter email id'); 
  }
  else if(!this.password)
  {
   this.toastr.warningToastr('enter password'); 
  }
 else if(!this.apiKey)
  {
    this.toastr.warningToastr('enter api key');
  }
  else{
    let data =
    {
      firstName:this.firstName,
      lastName:this.lastName,
      mobile:this.mobile,
      email:this.email,
      password:this.password,
      apiKey:this.apiKey
    }
    console.log("data is:::"+JSON.stringify(data));
    this.appservice.publicSignupFunction(data).subscribe(
    apiResponse =>{
    console.log(apiResponse);
if(apiResponse.status==200)
{
  this.toastr.successToastr('signup successful');
  setTimeout(() => {
    this.goToSignIn();
  }, 2000 );
}
else{
  this.toastr.errorToastr(apiResponse.message);
}
    },
    err =>
    {
      this.toastr.errorToastr('some error occurred');
      console.log('error message is'+err.message);
    }
    )
  }
}
}
