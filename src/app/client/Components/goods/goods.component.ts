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

  private routeSub;

  private nameFromUrl;
  private currentItem:any={title:'',name:'',id:null};
  private nextItemName;
  private prevItemName;

  private SlidingNext=false;
  private SlidingPrev=false;

  private mainImage;
  
  private currentCategory:any={color:'',title:'',name:'',id:null};

  constructor(private shopService:ShopService,private route:ActivatedRoute,private router:Router) { }


  ngOnInit() {
    window.addEventListener('wheel',this.scroll);
    this.routeSub = this.route.params.subscribe(params => {
      this.nameFromUrl = params["name"];
      this.shopService.getItemById(this.nameFromUrl).subscribe(items=>{
        
        if (items === null) this.router.navigate(["/404"]);
        this.currentItem=items[1];
        this.mainImage=this.currentItem.imgURL;
        this.prevItemName=(items[0])?items[0]:null;
        this.nextItemName=(items[2])?items[2]:null;
        this.SlidingNext=false;
        this.SlidingPrev=false;
        this.shopService.getCategoryByKey(this.currentItem.categoryId).subscribe(cat=>{
          this.currentCategory=cat;
          

        });
      })
    });
  }
  changeItem(item){

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
  scroll(e){
 
    this.bottomPos+=e.deltaY;
    if( this.bottomPos<0) this.bottomPos=0;
   
  }
}
