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

  //Текущие данные блока
  private height = 0;
  private preOpacity = 1;
  private scale = 1;
  private minWrapHeight = 120;
  private maxWrapHeight = window.innerHeight/100*60-50;
  private maxHeight = window.innerHeight/100*60;
  private imageMargin=0;
  private imageOpacity=1;
  private isOpen = false;
  private contentDisplay="none"


  //Для телефона
  private isWrapping = false;
  private startTouch = 0;
  private endTouch = 0;
  private wrapheight = 0;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener("wheel", ["$event"]) onWheel(e) {
    this.setPos(e.deltaY);
  }


  @HostListener("touchstart", ["$event"]) onWTouchStart(e) {
    if (
      //Если закрыто и зажато куда угодно в блоке, то он переходит в isWrapping
      (this.appBottomNav[0].offsetTop - e.touches[0].pageY < 0 &&!this.isOpen) ||
      //Если зажато в верхние 80px блока, то isWrapping (120 - 40)
      (this.appBottomNav[0].offsetTop - e.touches[0].pageY < 0 &&this.appBottomNav[0].offsetTop - e.touches[0].pageY > -40 &&this.isOpen)
    ) {
      this.isWrapping = true;
      this.startTouch = e.touches[0].pageY;
    }
  }

  @HostListener("touchend", ["$event"]) onTouchend(e) {
    if (this.isWrapping) {
      this.isWrapping = false;
      //Установить окончательную позицию
      this.setPos(this.startTouch - this.endTouch + (this.isOpen ? 80 : -150));
    }
  }
  @HostListener("touchmove", ["$event"]) onTouchmove(e) {
    if (this.isWrapping) {
      this.endTouch = e.touches[0].pageY;
      this.setPosPhone();
    }
  }

  //Промежуточная позиция во время toucheMove
  private setPosPhone() {
    
    let height,opacity,imageMargin;

    if (!this.isOpen) {

      this.wrapheight =this.startTouch - this.endTouch
      if (this.wrapheight<0) this.wrapheight=0;
      if (this.wrapheight > this.maxWrapHeight) this.wrapheight = this.maxWrapHeight;

      height = this.minWrapHeight + this.wrapheight;
    } else {
      this.wrapheight = this.maxHeight + this.startTouch - this.endTouch;
      height = this.wrapheight > this.maxHeight ? this.maxHeight : this.wrapheight;
    }

    imageMargin = -height/4
    opacity = 1-height/(this.maxHeight-this.minWrapHeight);
    this.renderer.setStyle(this.appBottomNav[0], "transition", "all 0.1s");
    this.renderer.setStyle(this.appBottomNav[0], "height", height + "px");
    this.renderer.setStyle(this.appBottomNav[1], "opacity", opacity);
    
  }

  //Конечная позиция
  private setPos(val) {
    this.maxWrapHeight = window.innerHeight/100*60-50;
    this.maxHeight = window.innerHeight/100*60;

    this.height = val > 0 ? this.maxHeight : 120;
    this.isOpen = val > 0 ? true : false;
    this.scale = val > 0 ? 0.7 : 1;
    this.imageMargin = val > 0 ? -this.maxHeight/4 : 0;
    this.contentDisplay = val > 0 ? "flex":"none";
    this.imageOpacity = val > 0 ? 0.5:1;

    this.preOpacity = val > 0 ? 0 : 1;
    this.renderer.setStyle(this.appBottomNav[0], "transition", "all 0.5s ease-out");
    this.renderer.setStyle(this.appBottomNav[0], "height", this.height + "px");
    this.renderer.setStyle(this.appBottomNav[1], "opacity", this.preOpacity);
    this.renderer.setStyle(this.appBottomNav[2],"margin-top",this.imageMargin + "px");
    this.renderer.setStyle(this.appBottomNav[2],"opacity",this.imageOpacity);
    this.renderer.setStyle(this.appBottomNav[3],"top","calc(50vh + "+(this.imageMargin-110) + "px)");
    this.renderer.setStyle(this.appBottomNav[4], "display", this.contentDisplay);
    this.renderer.setStyle(this.appBottomNav[4], "height", this.height-80 + "px");
  }
}
