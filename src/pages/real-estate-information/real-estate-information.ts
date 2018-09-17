import { OnLineServiceProvider, bankInfoModel } from './../../providers/on-line-service/on-line-service';
import { BuildModel, floorModel } from './../../providers/buildingsearch/buildingsearch';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RightpersoninformationPage } from '../rightpersoninformation/rightpersoninformation';
import { CommonHelper } from '../../models/commonHelper';

/**
 * Generated class for the RealEstateInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-real-estate-information',
  templateUrl: 'real-estate-information.html',
})
export class RealEstateInformationPage {

  /**
   * 传过来的银行ID
   */
  bankID:string;
  /**
   * 日期对象
   */
  dateObject = {
    /**
     * 抵押合同签订日期
     */
    dyagreementStarTime:'',

    /**
     * 债务起始日期
     */
    debtStarTime:'',

    /**
     * 债务终止日期
     */
    debtEndTime:'',
  }

  /**
   * 房屋模型
   */
  roomModel:floorModel = null;

  /**
   * 权利人信息模型数组
   */
  bankInfoList:bankInfoModel[] = [];
  
  /**
   * 权利人信息
   */
  quanlirenInfo:bankInfoModel;

  constructor(public navCtrl: NavController, public navParams: NavParams,public bankInfoProvide:OnLineServiceProvider,public helper:CommonHelper) {

    this.roomModel = navParams.get('roomModel');

    this.bankID = navParams.get('bankID');
  }

  ionViewDidLoad() {
    
    console.log('数据' + this.quanlirenInfo);

    this.bankInfoProvide.getPnlinePullListType('d4-1').subscribe( res => {

      if (res.StateCode == 1){

        this.bankInfoList = <bankInfoModel[]>JSON.parse(JSON.stringify(res.Data));

        let tempArr = this.bankInfoList.filter(item => item.Id == this.bankID);

        this.quanlirenInfo = tempArr.length > 0 ?  tempArr[0] : null;

      }else{

        this.helper.presentToast('网络出错',2000);
      }
    },err => {
      this.helper.presentToast('请求失败',2000);
    });

  }

  /**
   * 添加权利人信息
   */
  addQuanLiRenInfo() {
    this.navCtrl.push(RightpersoninformationPage,{
      title:'权利人详情',
      bankInfoModel:this.quanlirenInfo,
    });
  }

  /**
   * 添加义务人信息
   */
  addYiWuRenInfo() {
    this.navCtrl.push(RightpersoninformationPage,{
      title:'义务人详情',
      bankInfoModel:this.quanlirenInfo,
    });
  }

}
