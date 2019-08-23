import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private navService:NavService) { }
  private nav=[{},{}];
  ngOnInit() {
    this.navService.getCurrentMenu().subscribe(m=>this.nav[0]=m);
    this.navService.getBottomMenu().subscribe(m=>this.nav[1]=m);
    
  }
  scrollTop(){
    window.scrollTo({top:0,left:0,behavior:'smooth'});
  }

}
