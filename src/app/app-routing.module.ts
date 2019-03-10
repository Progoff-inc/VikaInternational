import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GoodsComponent } from './goods/goods.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProductComponent } from './product/product.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'goods', component: GoodsComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'product/:id', component: ProductComponent },
  { path: 'booking', component: BookingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
