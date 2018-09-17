import { SelectDate } from './enterprise';
import { Component, Input } from '@angular/core';
/**
 * 备案企业
 */
@Component({
  selector: 'enterprise',
  templateUrl: 'enterprise.html'
})
export class EnterpriseComponent { 
  @Input() title: string = '备案企业';
  @Input() date: SelectDate;
  constructor() {
     
  }

  /**
   * 修改select 
   * @param event 根据页面返回来的值
   */
  onchangSelect(event){ 
    for (let i in this.date.list) {
      if (this.date.list[i].Value ===this.date.value) { 
        this.date.index = parseInt(i);
        return false; 
      }
    } 
  }
}

/**
 * 传入的date 格式
 */
export interface SelectDate {
  
  /**
   * 索引
   */
  index:number,

  /**
   * select 的数据
   */
  list:any,

  /**
   * 返回的数据格式
   */
  value:string
}