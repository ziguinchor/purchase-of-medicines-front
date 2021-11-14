import { SharedModule } from './../shared/shared.module';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { InformationComponent } from './information/information.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import {NgPipesModule} from 'ngx-pipes';

const routes : Routes = [
  {path: 'cart', component: CartComponent},
  {path: 'information', component: InformationComponent},
  {path: 'pay', component: PaymentComponent},
  {path: 'success', component: PaymentSuccessComponent},
  {path: '', component: CartComponent}
]

@NgModule({
  declarations: [
    CartComponent,
    PaymentComponent,
    InformationComponent,
    PaymentSuccessComponent,
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NgPipesModule,
    SharedModule
  ]
})
export class SellsModule { }
export interface Countries {
  code: string
  code3: string
  name: string
  number: string
}

