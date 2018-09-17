import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the YuzidianCheckComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'yuzidian-check',
  templateUrl: 'yuzidian-check.html'
})
export class YuzidianCheckComponent {

  @Input() selectType:string;

  /**
   * 使用outPut来让子组件向父组件传递事件
   */
  @Output() onChange: EventEmitter<string> = new EventEmitter();

  inputNumber:number;

  constructor() {
    console.log('Hello YuzidianCheckComponent Component');
  }

  onKeyup(value:string) {
    this.onChange.emit(value);  // 传播事件  
  }

  // onKeyup(value: string) {   
  //   this.onChange.emit(value);  // 传播事件   
  // }   

  

}
