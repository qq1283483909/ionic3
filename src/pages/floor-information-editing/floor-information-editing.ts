import { RealEstateInformationPage } from './../real-estate-information/real-estate-information';
import { bankModel, BuildModel, floorModel } from './../../providers/buildingsearch/buildingsearch';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FloorInformationEditingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-floor-information-editing',
  templateUrl: 'floor-information-editing.html',
})
export class FloorInformationEditingPage {

  /**
   * 银行ID
   */
  bankID:string;
  /**
   * 楼层信息模型数组
   */
  buildList:floorModel[] = [];

  /**
   * 保存的数组--搜索使用到
   */
  originArr:floorModel[] = [];

  /**
   * 标题
   */
  title:string;

  /**
   * 搜索字符串
   */
  searchStr:string;
  
  /**
   * 
   * @param navCtrl 构造函数
   * @param navParams 
   */
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.buildList = navParams.get('subList');

    this.originArr = navParams.get('subList');

    this.title = navParams.get('title');

    this.bankID = navParams.get('bankID');
  }

  /**
   * 视图加载完毕
   */
  ionViewDidLoad() {
    

  }

  /**
   * 本地搜索 正则匹配
   * @param 
   */
  searchChange(e) {

    if (this.searchStr.length == 0) {

      this.buildList = this.originArr;

      return;
    }

    var temparr = [];
    var reg = new RegExp(this.searchStr);
    for (var i = 0; i < this.originArr.length; i++) {
      //如果字符串中不包含目标字符会返回-1
      if (this.originArr[i].RoomPart.match(reg)) {
        temparr.push(this.originArr[i]);
      }
    }

    this.buildList = temparr;

  }

/**
 * 跳转到编辑控制器
 */
goEditController(model:floorModel) {

  this.navCtrl.push(RealEstateInformationPage,{
    roomModel:model,
    bankID:this.bankID,
  });
}

}
