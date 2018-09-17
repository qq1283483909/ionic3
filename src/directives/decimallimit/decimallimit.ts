import { RegularExpression } from './../../infrastructure/regular-expression';
import { Directive, Input, HostListener } from '@angular/core';
import { IonicTapInput } from '../../../node_modules/ionic-angular/umd';
import { NgModel } from '../../../node_modules/@angular/forms';

/**
 * Generated class for the DecimallimitDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[decimallimit]' // Attribute selector
})



export class DecimallimitDirective {

  @Input('decimallimit') decimallimit: number;

  constructor(public ngModel: NgModel) {
    console.log('Hello DecimallimitDirective Directive');
  }

    /**
   * 自定义keyup事件限制指定的小数点位数
   * @param $event 是获取 Event
   * decimal:小数点位数
   */ 
  @HostListener('blur') 
  limitdecimal($event) {  
    /**
     * @param /(^\s*)|(\s*$)/g 去除空格 
     */       
    let result = (<HTMLInputElement>event.target).value.replace(RegularExpression.matchIOSSpace,''); 
 
    let numberresult = parseFloat(result).toFixed(this.decimallimit);

    /**
     * 引入 ngModel 模块。 viewToModelUpdate 修改ngmodel 的值
     */
    this.ngModel.viewToModelUpdate(numberresult);
    (<HTMLInputElement>event.target).value = numberresult; 
  }

}
