import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ShopService } from "../../services/shop.service";
import { Menu } from "src/app/model/Menu";
import { NavService } from '../../services/nav.service';



@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private shop: ShopService,private navService:NavService) {}

  private categories;
  private sub;


  ngOnInit() {

    this.sub = this.shop.getCategories().subscribe(cats => (this.categories = cats));
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
