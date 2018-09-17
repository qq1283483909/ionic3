
import { Content } from 'ionic-angular';
import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
/**
 *  滚动隐藏 nav header 和 footer
 */
@Directive({
  selector: '[scroll-hidden]' // Attribute selector
})
export class ScrollHiddenDirective {

    /**
     * 设置属性
     */
    @Input('scrollHide') config: ScrollHideConfig = <ScrollHideConfig>{ maxValue : undefined};

    /**
     * 监听滚动对象
     */
    @Input('scrollContent') scrollContent: Content;

    contentHeight: number;
    scrollHeight: number;
    lastScrollPosition: number;
    lastValue: number = 0;

    constructor(private element: ElementRef, private renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges) {
      if (this.scrollContent && this.config) {
          this.scrollContent.ionScrollStart.subscribe((ev) => {
              this.contentHeight = this.scrollContent.getScrollElement().offsetHeight;
              this.scrollHeight = this.scrollContent.getScrollElement().scrollHeight;
              if (this.config.maxValue === undefined) {
                  this.config.maxValue = this.element.nativeElement.offsetHeight;
              }
              this.lastScrollPosition = ev.scrollTop;
          });
          this.scrollContent.ionScroll.subscribe((ev) => this.adjustElementOnScroll(ev));
          this.scrollContent.ionScrollEnd.subscribe((ev) => this.adjustElementOnScroll(ev));
      }
  }


  private adjustElementOnScroll(ev) {
    if (ev) {
        ev.domWrite(() => {
            let scrollTop: number = ev.scrollTop > 0 ? ev.scrollTop : 0;
            let scrolldiff: number = scrollTop - this.lastScrollPosition;
            this.lastScrollPosition = scrollTop;
            let newValue = this.lastValue + scrolldiff;
            newValue = Math.max(0, Math.min(newValue, this.config.maxValue));
            this.renderer.setStyle(this.element.nativeElement, this.config.cssProperty, `-${newValue}px`);
            this.lastValue = newValue;
        });
    }
}


}
/**
 * 滚动隐藏配置
 */
export interface ScrollHideConfig {
    /**
     * css属性
     */
  cssProperty: string;
  /**
   * 隐藏最大值，undenfied为自动
   */
  maxValue: number;
}