import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { ModalModule, BsModalService } from 'ngx-bootstrap';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SalesCarouselComponent } from './sales-carousel/sales-carousel.component';
import { FooterComponent } from './footer/footer.component';
import { GoodsComponent } from './goods/goods.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProductComponent } from './product/product.component';
import { GoodsService } from './services/products.service';
import { CounterComponent } from './counter/counter.component';
import { BookingComponent } from './booking/booking.component';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './services/modal.service';
import { BookingCartComponent } from './booking-cart/booking-cart.component';
import { BookingPayDeliveryComponent } from './booking-pay-delivery/booking-pay-delivery.component';
import { BookingConfirmComponent } from './booking-confirm/booking-confirm.component';
import { BookingContactInfoComponent } from './booking-contact-info/booking-contact-info.component';
import { BookingSuccessComponent } from './booking-success/booking-success.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { EnterFormComponent } from './enter-form/enter-form.component';
import { UserService } from './services/user.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangeInfoComponent } from './change-info/change-info.component';
import { AddComponent } from './add/add.component';
import { AddSectionComponent } from './add-section/add-section.component';
import { UpdateSectionComponent } from './update-section/update-section.component';
import { UpdateGoodComponent } from './update-good/update-good.component';
import { AddSaleComponent } from './add-sale/add-sale.component';
import { UpdateSaleComponent } from './update-sale/update-sale.component';
import { LoadService } from './services/load.service';
import { LoadComponent } from './load/load.component';
import { UpdateSectionsComponent } from './update-sections/update-sections.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RememberPasswordComponent } from './remember-password/remember-password.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    HomeComponent,
    SalesCarouselComponent,
    FooterComponent,
    GoodsComponent,
    ContactsComponent,
    ProductComponent,
    CounterComponent,
    BookingComponent,
    ModalComponent,
    BookingCartComponent,
    BookingPayDeliveryComponent,
    BookingConfirmComponent,
    BookingContactInfoComponent,
    BookingSuccessComponent,
    ProgressBarComponent,
    AuthFormComponent,
    EnterFormComponent,
    UserProfileComponent,
    ChangeInfoComponent,
    AddComponent,
    AddSectionComponent,
    UpdateSectionComponent,
    UpdateGoodComponent,
    AddSaleComponent,
    UpdateSaleComponent, 
    LoadComponent, UpdateSectionsComponent, ChangePasswordComponent, RememberPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [GoodsService, UserService, FormBuilder, HttpClient, ModalService, BsModalService, LoadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
