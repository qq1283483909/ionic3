import { FeedbackPage } from './../feedback/feedback';
import { Tabs, ModalController } from 'ionic-angular';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScrollHideConfig } from '../../directives/scroll-hidden/scroll-hidden';
import { ForgetpasswordPage } from './../forgetpassword/forgetpassword';
import { UserInfo } from '../../infrastructure/user-info';
/**
 * 个人中心页
 *
 * 
 */



@IonicPage()
@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {

  /**
   * 获取到Tabs
   */
  tabs:Tabs;

  /**
   * 登录相关信息
   */
  loginInfo =  {
  personName:null,
  IsLogin:false,
  IsCompanyAccount:false,
  BindCompannyName:null,
  getUserHeadImage:null,
  getIsRealName:false,
  realNameTips:'未实名',
  };

  loginPage = LoginPage;
  ForgetpasswordPage;
  headerScrollConfig: ScrollHideConfig = <ScrollHideConfig>{ cssProperty: 'margin-top' };

  constructor(public navCtrl: NavController, public navParams: NavParams,public userinfo:UserInfo,public modalCtr:ModalController) {
    this.ForgetpasswordPage = ForgetpasswordPage;
    this.tabs = navCtrl.parent;
  }

  ionViewDidLoad() {
    this.getdata();
  }

  /**
   * 获取登录相关信息
   */
  getdata() {

    this.loginInfo.personName = this.userinfo.GetPersonName();
    this.loginInfo.IsCompanyAccount = this.userinfo.CheckIsCompanyAccount();
    this.loginInfo.IsLogin = this.userinfo.IsLogin();
    this.loginInfo.getUserHeadImage = this.userinfo.GetUserHeadImageUrl();
    this.loginInfo.BindCompannyName = this.userinfo.GetBindCompannyName();
    this.loginInfo.getIsRealName = this.userinfo.CheckIsReadName();

    this.loginInfo.realNameTips = this.loginInfo.getIsRealName ? '已实名' : '未实名';
  
  }

  /**
   * 跳转到登录界面
   */
  pushToLoginPage() {

    let LoginModalCtr = this.modalCtr.create(LoginPage);

    //视图消失的时候刷新数据
    LoginModalCtr.onDidDismiss(data => {

      this.getdata();

      console.log('数据' + JSON.stringify(this.loginInfo));
    });

    LoginModalCtr.present();
     
  }

  /**
   * 点击更换手机号
   */
  changePhoneNum() {

  }

  /**
   * 意见反馈
   */
  advice() {
    this.navCtrl.push(FeedbackPage);
  }

  /**
   * 注销操作
   */
  loginoutClick() {

    /**
     * 移除token
     */
    this.userinfo.removeToken();

    /**
     * 重置
     */
    this.loginInfo = {

      personName: null,
      IsLogin: false,
      IsCompanyAccount: false,
      BindCompannyName: null,
      getUserHeadImage: null,
      getIsRealName: false,
      realNameTips: '未实名',
    };

  }


}
