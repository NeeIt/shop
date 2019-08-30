import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, of, throwError, from } from "rxjs";
import { mergeMap, materialize, delay, dematerialize, skip, defaultIfEmpty, toArray, take } from "rxjs/operators";
import { Item } from "../model/Item";
import { Category } from "../model/Category";
import { CATEGORIES } from "./categories";
import { ITEMS } from "./items";
import { isNgTemplate } from '@angular/compiler';

let categories: Category[] =
  JSON.parse(localStorage.getItem("categories")) || CATEGORIES;
let items: Item[] = JSON.parse(localStorage.getItem("items")) || ITEMS;

@Injectable()
export class FakeBackIntercaptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = req;

    return of(null).pipe(
      mergeMap(handleRoute),
      materialize(),
      delay(500),
      dematerialize()
    );
    ////////////////////////////////////
    function handleRoute() {

      switch (true) {
        case url.match(/\/items\/categoryId\/\d+$/) && method === "GET":
          return getItemsByCategory();

        case url.match(/\/categories\/\d+$/) && method === "GET":
          return getCategoryById();

        case url.match(/\/categories\/\w+$/) && method === "GET":
          return getCategoryByName();

        case url.match(/\/categories/) && method === "GET":
          return getCategories();

        case url.match(/\/items\/\d+$/) && method === "GET":
          return getItemById();

        case url.match(/\/items\/\w+$/) && method === "GET":
          return getItemByName();

        case url.match(/\/otherexcept\/.+$/) && method === "GET":
          return getFiveRandom();

          case url.match(/\/items\/pack\/\d+$/) && method === "GET":
            return getTwenty();  

        default:
          return next.handle(req);
      }
    }
    ////////////////////////////////////
    function getItemsByCategory() {
      const it = items.filter(x => x.categoryId === idFromUrl());
      return ok(it);
    }

    function getCategoryById() {
      const cat = categories.find(x => x.id === idFromUrl());
      return ok(cat);
    }
    function getCategoryByName() {
      const cat = categories.find(x => x.name === nameFromUrl());
      return ok(cat);
    }

    function getCategories() {
      const cat = categories;
      return ok(cat);
    }

    function getItemById() {
      const it = items.find(x => x.id === idFromUrl());
      return ok(it);
    }
    function getItemByName() {
      let prev = null,
        now = null,
        next = null;
      const it = items.find(x => x.name === nameFromUrl());
      let id = it["categoryId"];
      let catItem = items.filter(x => x.categoryId === id);
      for (let i = 0; i < catItem.length; i++) {
        if (catItem[i] === it) {
          now = catItem[i];
          if (i === 0) {
            prev = null;
          } else prev = catItem[i - 1];
          if (i === catItem.length - 1) {
            next = null;
          } else next = catItem[i + 1];
          break;
        }
      }
      return ok([prev, now, next]);
    }
    function getFiveRandom() {

      let count = 0;
      let rndIds = [];
      
      
      let except = new Set(nameFromUrl().split(",").map(x=>parseInt(x)));


      if(items.length-except.size<5){
       for(let i=0;i<items.length;i++){
        if(except.has(i))continue;
        rndIds.push(i);
       }
      }else{
        while (rndIds.length < 5) {
          let num = Math.round(Math.random() * (items.length - 1));
          if(except.has(num))continue;
          rndIds.push(num);
          rndIds = [...new Set(rndIds)];
        }
      }

      let rndItems = items.filter(x =>{{
        for(let i =0;i<rndIds.length;i++){
          if(x.id===rndIds[i])return true;
          
        }
        return false;
      }});
    
      return ok(rndItems.sort((a,b)=>0.5-Math.random()));
    }
    function getTwenty(){
      let done=false;
      let x = idFromUrl();
      let its=[];
      
      from(items).pipe(skip(x*20),take(20),defaultIfEmpty(null)).subscribe(y=>{
        its.push(y);
        
      })
      
      return ok(its);
      
      
    }
    ////////////////////////////////////
    function idFromUrl() {
      const urlParts = url.split("/");
      return parseInt(urlParts[urlParts.length - 1]);
    }
    function nameFromUrl() {
      const urlParts = url.split("/");
      return urlParts[urlParts.length - 1];
    }

    function ok(body) {
      return of(new HttpResponse({ status: 200, body }));
    }
  }
}

export const fakeBackProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackIntercaptor,
  multi: true
};
