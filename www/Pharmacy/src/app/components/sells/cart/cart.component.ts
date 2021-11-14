import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // images: string = 'Mobile';
  // price: number = 32434;
  // total: number = 32434;
  totalPrice: number = 0;
  totalOrder: any;

  constructor() { }

  products: any;
  productAmount: number = 1;

  ngOnInit(): void {

    this.products = localStorage.localCart
    if (this.products) {
      this.products = JSON.parse(this.products)
      this.getTotalPrice(this.products)
    }
  }


  getTotalPrice(arr: any) {
    this.totalPrice = 0;
    arr.map((product: any) => {
      this.totalPrice += product.numberOfSells
    })
    this.totalOrder = this.totalPrice + 20
  }

  measureTotalPrice(price: any) {
    this.totalOrder = this.totalPrice
    return this.totalOrder += Number(price)
  }


  increaseByOne(place: number) {
    let current;
    for (let i: number = 0; i < this.products.length; i++) {
      if (i == place){
        this.products[i].quantity +=1
        this.products[i].numberOfSells = (this.products[i].quantity * this.products[i].price)
        this.getTotalPrice(this.products)
      }
    }
    localStorage.localCart = JSON.stringify(this.products)
    // current.quantity += 1
  }

  decreaseByOne(place: number) {
    let current;
    for(let i =0 ; i< this.products.length; i++){
      if(i == place){
        if(this.products[i].quantity > 1){
          this.products[i].quantity -=1
          this.products[i].numberOfSells = (this.products[i].quantity * this.products[i].price)
          this.getTotalPrice(this.products)
          localStorage.localCart = JSON.stringify(this.products)
          console.log(this.products[i].quantity)
        }else if(this.products[i].quantity <= 1 ){
          if(confirm('هل حقا تريد حذ المنتج من حقيبة المشتريات؟')){
            this.products = this.products.filter((item:any) => item._id != this.products[i]._id)
            this.getTotalPrice(this.products)
            localStorage.localCart = JSON.stringify(this.products)
          }
        }
      }
    }
  }

  storeTotalPriceOfOrder(total:any){
    localStorage.orderPrice = total
  }

}
