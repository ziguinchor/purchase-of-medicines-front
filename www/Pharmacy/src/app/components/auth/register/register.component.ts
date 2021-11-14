import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

// Social Imports
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: SocialAuthService, private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  form: FormGroup = new FormGroup({});
  isLogged: Boolean = false;
  isLoginSuccess = false;
  isLoginError = false;
  code: string = '';
  responseData: any;
  personalData: any;
  name: any;
  email: any;
  type: any;
  isPersonalDataLoaded: boolean = false;
  regesterData: any;

  // Variables for OAuth
  user: SocialUser = new SocialUser();
  GoogleLoginProvider = GoogleLoginProvider;
  loggedIn: boolean = false;
  responseChecked: any;

  ngOnInit(): void {

    console.log('logged stauts', this.userService.isLogged())
    if(this.userService.isLogged()){
      this.userService.logout();
    }

      // About OAuth
      this.authService.authState.subscribe(user => {
        this.loggedIn = (user != null);
        this.user = user;

        //check email
        this.userService.oAuthSignup(this.user).subscribe(response => {
          this.responseChecked = response;
          console.log(response)
          if (this.responseChecked.token) {
            localStorage.token = this.responseChecked.token;
            localStorage.user = JSON.stringify(this.responseChecked.user);
            this.userService.setLoggedStatus(true);
            this.router.navigateByUrl('/');
            this.isLoginSuccess = true;
            this.isLoginError = false;
          } else {
            this.isLoginError = true;
            this.isLoginSuccess = false;
          }

        }, error => {
          this.isLoginError = true;
          this.isLoginSuccess = false;
        })//End Of Check Email

      });






    // Check If User Logged Or Not


    // Validate Login Form
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(4), Validators.maxLength(255), Validators.required]],
      email: ['', [Validators.email, Validators.maxLength(255), Validators.required]],
      phone: ['', [Validators.maxLength(255), Validators.required]],
      address: ['', [Validators.maxLength(500), Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    });

  }
  //********************* End Of NgOnInit ******************/


  register() {
    this.isLogged = true;
    console.log(this.form.value)
    if (this.form.valid && this.form.controls.password.value == this.form.controls.password_confirmation.value) {
      console.log('valid')
      this.userService.register(this.form.value).subscribe(res => {
        this.regesterData = res;

        if (this.regesterData.token) {
          localStorage.token = this.regesterData.token;
          localStorage.user = JSON.stringify(this.regesterData.user);
          this.userService.setLoggedStatus(true);
          this.router.navigateByUrl('/');
          this.isLoginSuccess = true;
          this.isLoginError = false;
        } else {
          this.isLoginError = true;
          this.isLoginSuccess = false;
        }
      });

    } else {
      this.isLoginError = true;
      this.isLoginSuccess = false;
    }

  }

  hide() {
    this.isLoginSuccess = false;
    this.isLoginError = false;
  }


  // OAuth functions
  username: string = '';
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


  signOut(): void {
    this.authService.signOut();
  }

  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

}
