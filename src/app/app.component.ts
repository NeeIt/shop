import { Component } from '@angular/core';
import { ShopService } from './client/services/shop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private category=[];
  constructor(private shopService:ShopService){
  
  }
  ngOnInit(){
    
  }
}
