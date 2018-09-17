import { AuthenticationDetailsPage } from './../authentication-details/authentication-details';
import { CommonHelper } from './../../../models/commonHelper';
import { AuthenticationProvider, AuthorizationItem } from './../../../providers/authentication/authentication';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * 认证列表
 */

@IonicPage()
@Component({
  selector: 'page-authentication-list',
  templateUrl: 'authentication-list.html',
})
export class AuthenticationListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private commonHelper: CommonHelper, private authenticationProvider: AuthenticationProvider) {
  }

  ionViewDidLoad() {

  }

  /**
   * 授权列表
   */
  authenticationList: any;

  /**
   * 我的授权列表参数
   */
  authorizationItem: AuthorizationItem = {
    type: 'd4-2',
  };

  ngOnInit() {
    this.init();
  }



  /**
   * 初始化
   * @param then 页面初始化后调用的函数 方便上拉刷新时调用关闭`
   */
  init(then?: Function) {
    this.authenticationProvider.getAuthorizationList(this.authorizationItem).subscribe(data => {
      if (data.StateCode == 1) {
        this.authenticationList = data.Data;
      } else {
        this.commonHelper.presentToast(data.Message)
      }
      if (then) { then() };
    })
  }

  /**
   * 跳转详情
   * @param item 从页面传回的参
   */
  goDetails(item) {
    this.navCtrl.push(AuthenticationDetailsPage, { mongoId: item.MongoID, typeCode: item.TypeCode });
  }

  /**
   * 上拉刷新
   *  @param refresher 据页面传回来的event
   */
  doRefresh(refresher: any) {
    this.init(() => {
      refresher.complete();
    })
  }  
}
