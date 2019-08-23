import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ShopService } from "../../services/shop.service";
import { defaultIfEmpty } from "rxjs/operators";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  private routeSub;
  private nameFromUrl;
  private currentCategory={color:'234,234,234',img:'',id:0};
  private items;
  private windowW750;
  private windowW500;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private router: Router
  ) {}

  

  private getPositionHandle = eve => {
    if (this.windowW750 != window.innerWidth > 750) {
      this.windowW750 = window.innerWidth > 750;
      this.getPosition(eve);
    }
    if (this.windowW500 != window.innerWidth > 500) {
      this.windowW500 = window.innerWidth > 500;
      this.getPosition(eve);
    }
  };
  ngOnInit() {
    this.windowW750 = window.innerWidth > 750;
    this.windowW500 = window.innerWidth > 500;

    window.addEventListener("resize", this.getPositionHandle);

    this.routeSub = this.route.params.subscribe(params => {
      this.nameFromUrl = params["name"];
      this.shopService
        .getCategoryByKey(this.nameFromUrl)
        .pipe(defaultIfEmpty(null))
        .subscribe(cat => {
          if (cat === null) this.router.navigate(["/404"]);
          this.currentCategory = cat;
          this.shopService
            .getItemsByCategory(this.currentCategory.id)
            .subscribe(i => {
              this.items = i;
              this.getPosition();
            });
        });
    });
  }
  private lastPositions = [1, 1, 1];
  addHeight(height, stPos) {
    return (this.lastPositions[stPos - 1] += height);
  }
  getHeight(stPos) {
    return this.lastPositions[stPos - 1];
  }
  getPosition(eve?) {
    this.lastPositions = this.windowW750 ? [1, 1, 1]: this.windowW500 ?[1,1]: [1];
    for (let ind = 0; ind < this.items.length; ind++) {
      let index = ind;
      while (index > 2) {
        index -= 3;
      }

      let lowest = 0;
      for (let i = 0; i < this.lastPositions.length; i++) {
        if (this.lastPositions[i] < this.lastPositions[lowest]) lowest = i;
      }

      let xStart = lowest + 1;
      let xEnd = lowest + 2;

      let yStart = this.getHeight(xStart);
      let yEnd = this.addHeight(this.lastPositions.length==1?2:this.items[ind].height, xStart);

      this.items[ind].pos = {
        "grid-area": `${yStart}/${xStart}/${yEnd}/${xEnd}`
      };
    }
  }
}
