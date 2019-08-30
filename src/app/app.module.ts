import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {  AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { fakeBackProvider } from './backend/backend';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientModule } from './client/client.module';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule, 
    ClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [

    fakeBackProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
