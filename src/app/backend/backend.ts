import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { mergeMap, materialize, delay, dematerialize } from "rxjs/operators";
import { Item } from "../model/Item";
import { Category } from "../model/Category";
import { CATEGORIES } from "./categories";
import { ITEMS } from "./items";

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
