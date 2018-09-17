import { RegularExpression } from './../../infrastructure/regular-expression';
import { Directive, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';

/**
* 引入 ngModel 模块。 viewToModelUpdate 修改ngmodel 的值
* 使用这个指令一定要要有  [(ngModel)]  [(ngModel)]  [(ngModel)] 否则就要写 <form></form>表单 
* form 并不是用 ngModel 的。而是用键值对  
*/
import { NgModel, FormControlName, FormControl } from '@angular/forms';

/**
 * input 的自定义指令 limt 限制input 的输出超出
 */
@Directive({
  selector: '[limit-input]', // Attribute selectorc
  providers: [NgModel]
})
export class LimitInputDirective {

  constructor(private element: ElementRef, private renderer: Renderer2, private ngModel: NgModel) {

  }
  @Input('limit') sum: number;
  @Input('fromCtrlName') formCtrlName: FormControl;
  @Input('uppercase') uppercase: boolean = false; 
  @HostListener('input', ['$event'])
  oninput(e) { 
    let result = (<HTMLInputElement>event.target).value.replace(RegularExpression.matchIOSSpace, ''); 
     /**
     * 限制大写
     */
    result = this.uppercase != false?result.toUpperCase():result;  
    this.setValue(result);
  }  

  setValue(result) { 
    if (result.length >= this.sum) {
      result = result.slice(0, this.sum);
    }  
    if (this.formCtrlName) {
      this.formCtrlName.setValue(result);
    } else {
      this.ngModel.viewToModelUpdate(result);
    }
    (<HTMLInputElement>event.target).value = result;
  }
}
