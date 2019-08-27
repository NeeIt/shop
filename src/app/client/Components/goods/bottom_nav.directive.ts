import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  HostListener
} from "@angular/core";

@Directive({
  selector: "[appBottomNav]"
})
export class BottomNavDirective {
  @Input()
  appBottomNav: any;

  private height = 0;

  private preOpacity = 1;

  private touchY = 0;
  private minHeightPhone = 120;
  private heightPhone = 0;
  private isWrapping = false;
  private isOpen=false;
  private startTouch = 0;
  private endTouch = 0;

  private timeStamp;
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener("wheel", ["$event"]) onWheel(e) {
    this.setPos(e.deltaY);
  }

  @HostListener("touchstart", ["$event"]) onWTouchStart(e) {
    if (
      (this.appBottomNav[0].offsetTop - e.touches[0].pageY < 0 &&
      !this.isOpen) || (this.appBottomNav[0].offsetTop - e.touches[0].pageY < 0 &&
        this.appBottomNav[0].offsetTop - e.touches[0].pageY >-40 &&
        this.isOpen)
    ) {
      this.isWrapping = true;
        this.startTouch=e.touches[0].pageY;
    }
  }
  @HostListener("touchend", ["$event"]) onTouchend(e) {
    if(this.isWrapping){
        this.isWrapping=false;
        this.setPos(this.startTouch - this.endTouch+((this.isOpen)?150:-150));
    }
  }
  @HostListener("touchmove", ["$event"]) onTouchmove(e) {
    if(this.isWrapping){
        this.endTouch=e.touches[0].pageY;
        this.setPosPhone();
    }
   
  }

  private setPosPhone() {
      let value;
      if(!this.isOpen){
            this.heightPhone = this.startTouch - this.endTouch > 0 ? this.startTouch - this.endTouch : 0;
            if (this.heightPhone > 450) this.heightPhone = 450;
            value= this.minHeightPhone+this.heightPhone;
      }else{
            this.heightPhone = 500+this.startTouch-this.endTouch;
            value= this.heightPhone>500?500:this.heightPhone;

      }
    this.renderer.setStyle(this.appBottomNav[0],"height",value+ "px");
  }

  private setPos(val) {
    this.height = val > 0 ? 500 : 120;
    this.isOpen = val>0 ? true:false;

    this.preOpacity = val > 0 ? 0 : 1;
    this.renderer.setStyle(this.appBottomNav[0], "height", this.height + "px");
    this.renderer.setStyle(this.appBottomNav[1], "opacity", this.preOpacity);
  }
}
