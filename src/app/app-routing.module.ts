import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GoodsComponent } from './goods/goods.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProductComponent } from './product/product.component';
import { BookingComponent } from './booking/booking.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'goods/:id', component: GoodsComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'product/:id', component: ProductComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'user-profile', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
