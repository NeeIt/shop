import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {

  private bottomPos=0;

  //Начало цепочки получения 
  //[Взять имя из url -> Найти экземпляр -> По его id найти категорию -> В категориии найти прошлый и следующий товар]
  private routeSub;

  //По этому имени ищется категория и из неё уже прошлый и следующий товар
  private nameFromUrl;
  private currentCategory:any={color:'',title:'',name:'',id:null};

  //загрузка идет по 3 товара для более быстрого "листания" товаров 
  private currentItem:any={title:'',name:'',id:null};
  private nextItemName;
  private prevItemName;

  //процессы скролла
  private SlidingNext=false;
  private SlidingPrev=false;

  //Отдельно вынес из обьектов, чтобы картинка была заранее прогруженной при смене товара
  private mainImage;

  //Перехват для сохранения контекста компонента
  private handleKeyDown=(e)=>{this.keydown(e);}
  
  private rndItems=[];
  private rndIds=[];

  constructor(private shopService:ShopService,private route:ActivatedRoute,private router:Router) { }


  ngOnInit() {
   
    window.addEventListener('keydown',this.handleKeyDown);

    this.routeSub = this.route.params.subscribe(params => {
      
      this.nameFromUrl = params["name"];

      this.shopService.getThreeItemsById(this.nameFromUrl).subscribe(items=>{
        
        if (items === null) this.router.navigate(["/404"]);

        this.currentItem=items[1];
        
        this.mainImage=this.currentItem.imgURL;
        this.prevItemName=(items[0])?items[0]:null;
        this.nextItemName=(items[2])?items[2]:null;

        //Если этот товар был получен путем смены товара, закончить анимации
        if(this.SlidingNext)
        this.SlidingNext=false;
        if(this.SlidingPrev)
        this.SlidingPrev=false;

        this.rndItems=[];
        this.rndIds=[];
        this.rndIds.push(this.currentItem.id);
        

        this.shopService.getCategoryByKey(this.currentItem.categoryId).subscribe(cat=>{
          this.currentCategory=cat;
          

        });
      })
    });
  }

  ngOnDestroy(){
    window.removeEventListener('keydown',this.handleKeyDown);
    this.routeSub.unsubscribe();
  }

  keydown(e){
    switch(e.keyCode){
      case 37: this.changeItem(this.prevItemName); break;
      case 39: this.changeItem(this.nextItemName); break;
    }
  }

  changeItem(item){
    if(item===null)return;
    if(item===this.nextItemName){
    this.SlidingNext=true;
    }else if(item===this.prevItemName){
    this.SlidingPrev=true;
    }
    setTimeout(()=>{
      this.currentItem=item;
      this.router.navigate([`/goods/${item.name}`])
    },300);
  }
  getRnd(){
    this.shopService.getRandomFiveItems(this.rndIds).subscribe(x=>{
      this.rndItems.push(...x);
      for(let i=0;i<x.length;i++){
        this.rndIds.push(x[i].id);
      }
    });
  }

}
