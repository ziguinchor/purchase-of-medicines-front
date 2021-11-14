import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService, private http: HttpClient) { }

  stripeResponse: any;
  beforeClick: boolean = false
  totalPrice :any;

  ngOnInit(): void {
    this.loadStripe();
    this.totalPrice = localStorage.orderPrice
  }


  // ************* paypal ***********//
  paypal(){
    location.assign('http://localhost:8080')
  }


  loadStripe() {

    if (!window.document.getElementById('stripe-script')) {
      let s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }

  }


  pay(amount: any) {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JoBiBCT1XfYCoGciYEW3opcauXtFS0o6j4WSRvNXs4DwobozRK3YpE4wup170Mn1yNp7MXOaaF2acP04YTti0wa00666D4MmT',
      locale: 'auto',
      token: async (token: any) => {
        try {
          this.beforeClick = true
          this.apiService.post('http://localhost:8080/api/payment',
            { tokenId: token.id, amount: 70 }
          ).subscribe((response: any) => {
            console.log(response)
            this.stripeResponse = response
            if (this.stripeResponse.id) {
              this.router.navigateByUrl('/sells/success')
            } else {
              alert('sorry you donnot have enough charge');
              this.router.navigateByUrl('/')
            }
          }, error => {
            alert('sorry you donnot have enough charge');
            this.router.navigateByUrl('/')
          })
          // console.log(token)
        } catch (e) {
          console.log(e)
        }
      }

    });


    handler.open({
      name: 'معلومات البطاقه',
      description: '',
      amount: amount * 100
    });

  }

}
