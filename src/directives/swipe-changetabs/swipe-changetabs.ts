import { Tabs } from 'ionic-angular';
import { Directive, Input, HostListener } from '@angular/core';


/**
 * Generated class for the SwipeChangetabsDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[swipe-changetabs]' // Attribute selector
})
export class SwipeChangetabsDirective {

  constructor() {
    console.log('Hello SwipeChangetabsDirective Directive');
  }

  @Input('Tabs') tabs: Tabs;

  @Input('selectIndex') index:number;
  /**
  * 自定义swiper事件
  * @param $event 是获取 Event
  */

 @HostListener('swipe',['$event'])
 swipeRight(e) {
   console.log(e);
  /**
    * 偏移方向4是向右 2是向左
    */
   if (e.offsetDirection == 2 && this.index == 0){

      this.tabs.select(this.index + 1);
   }else if (e.offsetDirection == 4 && this.tabs.length() - 1 == this.index){

      this.tabs.select(this.index - 1);
   }else {

      e.offsetDirection == 4 ? this.tabs.select(this.index - 1) : this.tabs.select(this.index + 1);
   }

 }


}
