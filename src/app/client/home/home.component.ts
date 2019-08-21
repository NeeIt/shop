import { Component, OnInit } from "@angular/core";
import { ShopService } from "../services/shop.service";
import { Menu } from "src/app/model/Menu";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private shop: ShopService) {}

  private categories;
  private nav: Menu[] = [
    {
      name: "topBar",
      points: [
        { url: "#", name: "BLOG" },
        { url: "#", name: "MAGAZINE" },
        { url: "#", name: "GALLERY" },
        { url: "#", name: "SOCIAL" }
      ]
    },
    {
      name: "bottomBar",
      points: [
        { url: "#", name: "RETURNS" },
        { url: "#", name: "NEWSLETTER" },
        { url: "#", name: "SITE MAP" }
      ]
    }
  ];
  ngOnInit() {
    this.shop.getCategories().subscribe(cats => (this.categories = cats));
  }
}
