import { Injectable } from "@angular/core";
import { Menu } from "src/app/model/Menu";
import { of, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NavService {
  private header: Menu = {
    name: "header",
    points: [{ url: "/home", name: "SHOP" }, { url: "#", name: "INSPRITE" }]
  };

  private homeMenu = {
    name: "topBar",
    points: [
      { url: "#", name: "BLOG" },
      { url: "#", name: "MAGAZINE" },
      { url: "#", name: "GALLERY" },
      { url: "#", name: "SOCIAL" }
    ]
  };

  private bottomMenu = {
    name: "bottomBar",
    points: [
      { url: "#", name: "RETURNS" },
      { url: "#", name: "NEWSLETTER" },
      { url: "#", name: "SITE MAP" }
    ]
  };

  private menu404 = {
    name: "404Bar",
    points: [
      { url: "/home", name: "FUCK GO HOME" }
    ]
  };
  //////////////////////////////////////////////////
  private currentMenu= new BehaviorSubject<any>(null);
  private observe = this.currentMenu.asObservable();

  constructor() {}
  getHeaderMenu() {

    return of(this.header);
  }
  getBottomMenu(){

    return of(this.bottomMenu);
  }
  getCurrentMenu(){

    return this.observe;
  }
  setCurrent(str){
    console.log(str);
    //  category/instruments -> category
    str=(str.split('/').length>1 && str.split('/')[1]!="(%23)")?str.split('/')[0]:str;
    switch(str){
      
      case 'home': this.currentMenu.next(this.homeMenu); break;
      case '404': this.currentMenu.next(this.menu404); break;
      case 'category':this.currentMenu.next(this.homeMenu); break;
      default:  this.currentMenu.next({}); break;
    }

  }

}
