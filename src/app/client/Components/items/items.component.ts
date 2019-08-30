import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  private items=[];
  private culcPacks=0;
  constructor(private shopService:ShopService) { }

  ngOnInit() {
    this.getTwentyItems();
  }
  getTwentyItems(){

    this.shopService.getTwenty(this.culcPacks).subscribe((x:Array<any>)=>{
      this.items.push(...x);
      this.culcPacks++;

    });
    
  }
}
