import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private http : HttpClient) { }

  form: FormGroup = new FormGroup({});
  isLogged: Boolean = false;
  isLoginSuccess = false;
  isLoginError = false;
  code: string = '';
  responseData: any;
  logginData: any;

  ngOnInit(): void {



    // Validate Login Form
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.maxLength(255), Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(15)]]
    });

  }

  login() {
    this.isLogged = true;

    if (this.form.valid) {
      console.log(this.form.value);
      this.http.post('http://localhost:8080/api/auth/login',this.form.value).subscribe(res => {
        console.log(res)
        this.logginData = res;
        if (this.logginData) {
          localStorage.token = this.logginData.token;
          this.router.navigateByUrl('/');
          this.isLoginSuccess = true;
          this.isLoginError = false;
        } else {
          this.isLoginError = true;
          this.isLoginSuccess = false;
        }

      }, (error) => {
        console.log(error)
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
