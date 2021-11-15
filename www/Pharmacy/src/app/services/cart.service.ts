import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private userService: UserService, private router: Router) { }

  toCart(book: any) {
    let itemCart = [];
    if (!this.userService.isLogged()) {
      this.router.navigateByUrl('/auth/login')
    }
    else {
      let carDataNull = localStorage.getItem('localCart');
      if (carDataNull == null) {
        let storeDataGet: any = [];
        book.quantity = 1;
        book.numberOfSells = book.quantity * book.price
        storeDataGet.push(book);
        localStorage.setItem("localCart", JSON.stringify(storeDataGet));
      }
      else {
        var id = book._id;
        let index: number = -1;
        itemCart = JSON.parse((localStorage.getItem("localCart"))!);
        for (let i = 0; i < itemCart.length; i++) {
          if (parseInt(id) === parseInt(itemCart[i]._id)) {
            itemCart[i].amount = book.amount;
            index = i;
            break;
          }
        }
        if (index == -1) {
          book.quantity = 1;
          book.numberOfSells = book.quantity * book.price
          itemCart.push(book);
          localStorage.setItem("localCart", JSON.stringify(itemCart))
        } else {
          localStorage.setItem("localCart", JSON.stringify(itemCart))
        }
      }
      this.cartNumberFunc();
      // localStorage.setItem("localCart",JSON.stringify(book))
    }
  }



  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('localCart')!);

    this.userService.cartSubject.next(cartValue.length)
    //  console.log(this.cartNumber);
  }
}


