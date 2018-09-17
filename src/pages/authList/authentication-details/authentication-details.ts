import { UserInfo } from './../../../infrastructure/user-info';
import { AuthActionSheet } from './../../../models/AuthActionSheet';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonHelper } from './../../../models/commonHelper';
import { AuthenticationProvider, BusinessiInfoItem } from './../../../providers/authentication/authentication';
import { timeTrans } from '../../../infrastructure/regular-expression';
/**
 * 我的授权列表 详情
 */

@IonicPage()
@Component({
  selector: 'page-authentication-details',
  templateUrl: 'authentication-details.html',
})
export class AuthenticationDetailsPage {

  /**
   * 从列表页传回来的 mongoId 和 typeCode
   * 用来请求详情
   */
  BusinessiInfoItem: BusinessiInfoItem = {
    mongoId: '',
    typeCode: '',
  }

  /**
   * 接收接口返回来的数据 
   * @param qlrList 权利人数组
   * @param ywrList 义务人数组
   */
  detailsBox = {
    qlrList: '',
    ywrList: ''
  }

  /**
   * 接收接口返回的信息
   */
  info: any;


  constructor(public navCtrl: NavController, private userInfo: UserInfo, private authActionSheet: AuthActionSheet, public navParams: NavParams, public authenticationProvider: AuthenticationProvider, private commonHelper: CommonHelper) {
    this.BusinessiInfoItem.mongoId = navParams.get('mongoId');
    this.BusinessiInfoItem.typeCode = navParams.get('typeCode');
    this.authenticationProvider.getBusinessiInfo(this.BusinessiInfoItem).subscribe(data => {
      this.info = data.Data;
    });

  }

  ngOnInit() {
    this.authenticationProvider.getBusinessiInfo(this.BusinessiInfoItem).subscribe(data => {
      if (data.StateCode == 1) {
        this.info = data.Data;
        this.info.LoanDays = timeTrans(new Date(this.info.LoanDays).getTime(), 'yyyy-MM-dd');
        this.info.LoanStart = timeTrans(new Date(this.info.LoanStart).getTime(), 'yyyy-MM-dd');
        this.info.RequestPersons.forEach(person => {
          if (person.RoleName === "义务人") {
            this.detailsBox.ywrList += person.PersonName + " ";
          } else if (person.RoleName === "权利人") {
            this.detailsBox.qlrList += person.PersonName + " ";
          }
        });
      } else {
        this.commonHelper.presentToast(data.Message);
        /**
         * 返回上一页
         */
        this.navCtrl.pop();
      }
    })
  }

  /**
   * 点击认证
   */
  goAuth() {
    this.authActionSheet.actionSheet(this.userInfo.GetPersonName(), this.userInfo.GetPersonNo(), this.userInfo.GetUserName()).subscribe(value => {
      console.log(value);
      console.log('2');
    });
  }

}
