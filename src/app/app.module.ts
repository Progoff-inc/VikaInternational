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
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [GoodsService, FormBuilder, HttpClient, ModalService, BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
