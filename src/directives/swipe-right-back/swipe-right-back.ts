import { NavController, NavOptions } from 'ionic-angular';
import { Directive, Input, HostListener } from '@angular/core';
import { Device } from '@ionic-native/device';
/**
 * Generated class for the SwipeRightBackDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[swipe-right-back]' // Attribute selector
})
export class SwipeRightBackDirective {

  constructor(private device:Device) {
    console.log('Hello SwipeRightBackDirective Directive');
  }

  @Input('bdcnavCrl') navCrl: NavController;
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
    if (e.offsetDirection == 4){
      if (this.navCrl.canGoBack && this.device.platform != 'iOS'){
        this.navCrl.pop(<NavOptions>{
          animate:true,
          animation:'bounce',
        });
      } 
    }
  }


}
