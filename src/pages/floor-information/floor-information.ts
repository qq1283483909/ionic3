import { CommonHelper } from './../../models/commonHelper';
import { floorModel, BuildModel } from './../../providers/buildingsearch/buildingsearch';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BuildingsearchProvider } from '../../providers/buildingsearch/buildingsearch';
import { FloorInformationEditingPage } from '../floor-information-editing/floor-information-editing';

/**
 * Generated class for the FloorInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-floor-information',
  templateUrl: 'floor-information.html',
})
export class FloorInformationPage {
  /**
   * 页面传过来的银行ID
   */
  bankID:string;

  /**
   * 单元号
   */
  bdcUnitNo:string;

  /**
   * 标题
   */
  title:string;

  /**
   * 楼层信息数组
   */
  floorList:floorModel[] = [];

  /**
   * 按层分好组的数组
   */
  subList:any[] = [];

  /**
   * 每次可编辑个数的数组
   */
  CaneditList:number[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public floorProvide:BuildingsearchProvider,public helper:CommonHelper) {

    this.bdcUnitNo = navParams.get('bdcUnitNo');

    this.bankID = navParams.get('bankID');
  }

  ionViewDidLoad() {
    
    this.floorProvide.getBuildFloorInfo(this.bdcUnitNo).subscribe( res => {

      if (res.StateCode == 1){

        this.floorList = <floorModel[]>JSON.parse(JSON.stringify(res.Data['BdcUnits']));

        this.title = res.Data['Location'];

        /**
         * 按照层号分组
         */
        var b = this.floorList.reduce((r, x) => ((r[x.FloorNo] || (r[x.FloorNo] = [])).push(x), r), {});
        this.subList = Object.keys(b).map(x => b[x]);

        this.CaneditList = [];

        /**
         * 统计可编辑的个数并保存为数组
         */
        for (var i = 0 ; i < this.subList.length ; i++) {

          var alreadySelect = 0;

          for (var j = 0 ; j < this.subList[i].length ; j++) {

            let item = this.subList[i][j];

            if (item.CanSelect == false && item.CannotSelectReason) {

              alreadySelect += 1;
            }
          }
          
          this.CaneditList.push(alreadySelect);
        }

      }else {
        this.helper.presentToast('网络出错',2000);
      }
    },err => {
      this.helper.presentToast('请求失败',2000);
    });
  }


  /**
   * 跳转到编辑页面
   */
  goEditingPage(buildList:floorModel[]) {
    this.navCtrl.push(FloorInformationEditingPage,{
      subList:buildList,
      title:this.title,
      bankID:this.bankID,
    });
  }

}
