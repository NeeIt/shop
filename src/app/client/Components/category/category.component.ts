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
  //Цепочка получения товаров
  //[Получить имя из Url -> Найти по нему категорию ->найти все предметы категории]
  private routeSub;

  private nameFromUrl;

  private currentCategory = { color: "234,234,234", img: "", id: 0 };

  //Товары категории
  private items;

  //Значение t/f
  private windowW750; //Ширина экрана больше 750
  private windowW500; //больше 500

  //столбцы товаров
  private lastPositions:Array<any>;


  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private router: Router
  ) {}

  //Перехватывает изменение Ширины
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
      
      this.shopService.getCategoryByKey(this.nameFromUrl).pipe(defaultIfEmpty(null)).subscribe(cat => {
          
        if (cat === null) this.router.navigate(["/404"]);
        
        this.currentCategory = cat;
        
        this.shopService.getItemsByCategory(this.currentCategory.id).subscribe(i => {
          this.items = i;
          
          //Как получили товары айда их распределять
          this.getPosition();
            });
        });
    });
  }
  ngOnDestroy(){
    window.removeEventListener("resize", this.getPositionHandle);
    this.routeSub.unsubscribe();
  }
 
  //Добавляет товар на страницу
  addHeight(height, stPos) {
    return (this.lastPositions[stPos - 1] += height);
  }

  //Возвращает высоту столбца в котором товар
  getHeight(stPos) {
    return this.lastPositions[stPos - 1];
  }

  //Расставляет все товары из  items
  getPosition(eve?) {
    //Количество столбцов в зависимости от ширины экрана
    this.lastPositions = this.windowW750? [1, 1, 1]
      : this.windowW500? [1, 1]: [1];

    for (let ind = 0; ind < this.items.length; ind++) {

      //индекс столбца с самой малоый высотой
      let lowest = 0;


      for (let i = 0; i < this.lastPositions.length; i++) {
        if (this.lastPositions[i] < this.lastPositions[lowest]) 
          lowest = i;
      }

      let xStart = lowest + 1;
      let xEnd = lowest + 2;

      let yStart = this.getHeight(xStart);

      //Если количество столбцов 1, то у всех будет одна высота (2)
      let yEnd = this.addHeight(
        this.lastPositions.length == 1 ? 2 : this.items[ind].height,
        xStart
      );

      this.items[ind].pos = {
        "grid-area": `${yStart}/${xStart}/${yEnd}/${xEnd}`
      };
    }
  }
}
