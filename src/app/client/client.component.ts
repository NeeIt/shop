import { Component, OnInit } from '@angular/core';
import { NavService } from './services/nav.service';
import { Router, NavigationEnd } from '@angular/router';
import { throttleTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  private navShow=true;
  private burgerMenu=false;
  constructor(private navService:NavService,private router:Router) { }

  ngOnInit() {
    this.checkUrl(window.location.href.split('/')[3]);

    this.router.events.pipe(throttleTime(200)).subscribe((val) => {
      let url = val['url'].slice(1);
      this.checkUrl(url);
  });
  }
  setPageMenu(url){
    this.navService.setCurrent(url);
  }
  checkUrl(url){
      if(url.indexOf('goods')!=-1){
        this.navShow=false;
      }
      else{
        this.navShow=true;
      }
      
      
      
      
      this.setPageMenu(url);
  }
  hideBurger(event){
    
    this.burgerMenu=false;

  }
  showBurger(event){
    this.burgerMenu=true;
  }

}
