import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },{
    path: 'sells',
    loadChildren: () => import('./components/sells/sells.module').then(m => m.SellsModule)
  },
  {path: 'orders/pay' , component: CardComponent}
,
  {
    path: '',
    loadChildren: () => import('./components/main-page/main-page.module').then(m => m.MainPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
