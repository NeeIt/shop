import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent implements OnInit {
  private hide=false;
  private navs=[];
  constructor(private navService:NavService){}
  @Output() state = new EventEmitter();
  ngOnInit() {
    this.navService.getHeaderMenu().subscribe(n=>this.navs[0]=n);
    this.navService.getCurrentMenu().subscribe(n=>this.navs[1]=n);
    this.navService.getBottomMenu().subscribe(n=>this.navs[2]=n);
  }
  close(){
    this.hide=true;
    setTimeout(()=>this.state.emit(),300);
    
  }
}
