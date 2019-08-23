import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {  AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { fakeBackProvider } from './backend/backend';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientModule } from './client/client.module';
import { NavService } from './client/services/nav.service';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule, 
    ClientModule
  ],
  providers: [

    fakeBackProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
