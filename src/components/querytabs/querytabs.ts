import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyString, QueryString } from './../../infrastructure/currency-string'; 
/**
 * 查档的2级tab 
 */
@Component({
  selector: 'querytabs',
  templateUrl: 'querytabs.html'
})
export class QuerytabsComponent {
  /**
   * 获取组件上的属性。用来判断是机构查档还是个人查档
   * 0是个人查档    1是机构查档
   */
  @Input() index: number; 

  /**
   * 从组件上获取的对象
   */
  @Input() open:any; 

  /**
   * 初始化字符串
   */
  initString = { 
    /**
    * 2级tabs的name 
    */
    tabs: QueryString.queryinformationTabs, 
    tabB: [
      { name: CurrencyString.bdcqzName },
      { name: CurrencyString.yfqzName },
      { name: CurrencyString.qtName },
    ],
    gkdcxName: CurrencyString.gkdcxName,
    mxdcxName: CurrencyString.mxdcxName,
    bdcqzName: CurrencyString.bdcqzName,
    yfqzName: CurrencyString.yfqzName,
    qtName: CurrencyString.qtName,

    cxgkdName: CurrencyString.cxgkdName,
    cxbrName: CurrencyString.cxbrName,
    cxjtcyName: CurrencyString.cxjtcyName,
    cdjlName: CurrencyString.cdjlName,
  }
  constructor() {
     
  } 

  /**
   * 视图初始化之后
   */
  ngAfterViewInit(){  
  }
  /**
   * 查询公开档->底部显示value
   * 查询公开档->邕房权证输入的校验号码
   * 邕房权证字 一定要8位数
   * 邕房预字 一定要7位数
   * 邕房他字 一定要6位数
   * 查询公开档->不动产权输入的校验号码
   * 7位数的产权号或证明号
   * 
   * 查询公开档->不动产权输入的桂XXXX
   * 4位数的号码
   */
  checkValue() {
    let values = {
      no: '桂',
      nooTip1: '第',
      nooTip2: '号',
      noo: '',
    }
    let txt;
    switch (this.initString.tabs) {
      case '不动产权证':
        if (this.open.no == '' || this.open.no == null) {
          values.no = '';
        } else {
          values.no = '桂'
          values.no = values.no + this.open.no;
        }
        if (this.open.noo == '' || this.open.noo == null) {
          values.nooTip1 = values.nooTip2 = '';
        } else {
          values.nooTip1 = '第';
          values.nooTip2 = '号';
          values.noo = values.nooTip1 + this.open.noo + values.nooTip2;
        }
        txt = values.no + this.open.typeTxt + values.noo;
        break;
      case '邕房权证':
        if (this.open.Yno == '' || this.open.Yno == null) {
          values.nooTip1 = values.nooTip2 = '';
        } else {
          values.nooTip1 = '第';
          values.nooTip2 = '号';
          values.noo = values.nooTip1 + this.open.Yno + values.nooTip2;
        }
        txt = this.open.YTypeTxt + values.noo;
        break;
    }
    this.open.value = txt;
    this.outputEvent.emit(this.open);
  }


  /**
   * tabs切换
   */
  tabsChanged(){
    QueryString.queryinformationTabs =this.initString.tabs;
    this.open.value = '';
  }

  /**
   * 自定义事件
   * 向父组件传送值
   */
  @Output() outputEvent = new EventEmitter<any>();

}
