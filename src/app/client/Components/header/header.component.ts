import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Menu } from 'src/app/model/Menu';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private nav=[{},{}]
  @Output() state = new EventEmitter()
  constructor(private navService:NavService) { }

  ngOnInit() {
    
    this.navService.getHeaderMenu().subscribe(menu=>this.nav[0] = menu);
    this.navService.getCurrentMenu().subscribe(menu=>this.nav[1] = menu);
  }
  open(){
    this.state.emit();
  }
}
