import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/model/Menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private nav:Menu = {name:'header',points:[
    {url:"#",name:"SHOP"},
    {url:"#",name:"INSPRITE"}
  ]}

  constructor() { }

  ngOnInit() {
    
  }

}
