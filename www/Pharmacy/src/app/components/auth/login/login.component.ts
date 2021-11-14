import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router, private userService : UserService) { }

  form: FormGroup = new FormGroup({});
  isLogged: Boolean = false;
  isLoginSuccess = false;
  isLoginError = false;
  code: string = '';
  responseData: any;
  logginData: any;

  ngOnInit(): void {

    this.userService.isLogged() && this.router.navigateByUrl('/');


    // Validate Login Form
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.maxLength(255), Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    });

  }

  login() {
    this.isLogged = true;

    if (this.form.valid) {
      console.log(this.form.value);
      this.userService.login(this.form.value).subscribe(res => {
        console.log(res)
        this.logginData = res;
        if(this.logginData.token){
          localStorage.token = this.logginData.token;
          localStorage.user = JSON.stringify(this.logginData.user);
          this.userService.setLoggedStatus(true);
          this.router.navigateByUrl('/');
          this.isLoginSuccess = true;
          this.isLoginError = false;
        }else{
          this.isLoginError = true;
          this.isLoginSuccess = false;
        }

      }, (error) => {
        this.isLoginError = true;
        this.isLoginSuccess = false;
      })


    } else {
      this.isLoginError = true;
      this.isLoginSuccess = false;
    }

  }

  hide() {
    this.isLoginSuccess = false;
    this.isLoginError = false;
  }


}
