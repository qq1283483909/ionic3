import { ConnectionPage } from './../connection/connection';
import { AuthenticationListPage } from './../authList/authentication-list/authentication-list';
import { MyBusinessSerialNumberPage } from './../my-business-serial-number/my-business-serial-number';
import { ComplexQueryPage } from './../complex-query/complex-query';
import { Tabs } from 'ionic-angular';

import { ContactPage } from './../contact/contact';
import { QueryOtherInformationPage } from './../queryOtherInformation/queryOtherInformation';
import { PreliminaryPage } from './../preliminary/preliminary';
import { ProgressQueryPage } from '../progress-query/progress-query';
import { OnlinePage } from './../online/online';
import { CheckservicePage } from './../checkservice/checkservice';
import { NewsProvider, NewsItem } from './../../providers/news/news';
import { ApiUrlManagement } from './../../infrastructure/api-url-management';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QueryinformationPage } from './../queryinformation/queryinformation';
import { CommonHelper } from './../../models/commonHelper';
import { AuthProvider } from './../../providers/auth/auth';
import { AuthenticationPage } from './../authentication/authentication';
import { Component, ViewChild } from '@angular/core';
import { NavController, Alert, Tab } from 'ionic-angular';
import { AuthActionSheet } from '../../models/AuthActionSheet';

import { ActionSheetController } from 'ionic-angular';
import { RelevantdepartmentsPage } from '../relevantdepartments/relevantdepartments';
import { typeInfos } from '../../infrastructure/typeInfoHelper';
import { RightpersoninformationPage } from '../rightpersoninformation/rightpersoninformation';


import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from "@angular/forms";
import { RegularExpression, forRegExpValidator, } from '../../infrastructure/regular-expression';
import { BusinessPage } from '../business/business'; 

/*
 * 首页
*/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  /**
  * 获取到Tabs
  */
  tabs: Tabs;

  /**
   * 新闻数组模型
   */
  newsList: NewsItem[] = [];

  /**
   * 构造方法
   * @param navCtrl 导航控制器
   * @param authActionSheet 认证actionsheet帮助类
   */
  constructor(public navCtrl: NavController, public fb: FormBuilder, private commonHelper: CommonHelper, public authActionSheet: AuthActionSheet, public actionSheetCtrl: ActionSheetController, public newprovide: NewsProvider) {

    /**
     * 最底层导航控制器的parent就死Tabs
     */
    this.tabs = navCtrl.parent; 
  } 

  


  /**
   * init方法
   */
  ngOnInit() {

    
    this.newprovide.getNewsList().subscribe(res => {

      this.newsList = res;

    });
  }


 


  /**
   * 新闻详情页
   */
  newsdetailVC(newsid: string) {

    alert(newsid);

  }

  /**
   * 查档服务
   */
  checkservice() {

    this.navCtrl.push(CheckservicePage);
  }

  /**
   * 跳转到相关资讯
   */
  pushToNews() {

    this.tabs.select(1);
  }

  click() {
    this.authActionSheet.actionSheet('唐源健', '450902198901012714', '17776685391').subscribe(value => {
      alert(value);
    });


    //this.commonHelper.presentLoading();
    // this.authActionSheet.actionSheet('唐源健', '450902198901012714', '17776685391').subscribe(value=>{
    //   console.log(value);
    // });
    // this.navCtrl.push(AuthenticationPage)
  }

  zhima() {
    this.authActionSheet.actionSheet('唐源健', '450902198901012714', '17776685391').subscribe(value => {
      console.log(value);
      console.log('2');
    });
  }

  goQuer() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '查档类型选择',
      buttons: [
        {
          text: '个人查档',
          handler: () => {
            this.navCtrl.push(QueryinformationPage);
          }
        }, {
          text: '机构查档',
          handler: () => {
            this.navCtrl.push(QueryOtherInformationPage);
          }
        }, {
          text: '查验查档',
          handler: () => {
            this.checkservice();
          }
        }, {
          text: '取消',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  PreliminaryPage = PreliminaryPage;
  ProgressQueryPage = ProgressQueryPage;
  OnlinePage = OnlinePage;
  goOnlinePage(type: string) {
    console.log("代码方式跳转");

    //跳转到指定页面， 后面的集合是一个参数
    this.navCtrl.push(OnlinePage, { Type: type });
  }

  goAuthorization(){
     //跳转到指定页面， 后面的集合是一个参数
     this.navCtrl.push(AuthenticationListPage);
  }
  goPreliminaryPage() {
    console.log("代码方式跳转");

    //跳转到指定页面， 后面的集合是一个参数
    this.navCtrl.push(PreliminaryPage);
  }

  goRelevantdepartmentsPage() {
    console.log("代码方式跳转");
    //跳转到指定页面， 后面的集合是一个参数
    this.navCtrl.push(RelevantdepartmentsPage);
  }
  
  goProgressQueryPage() {
    this.navCtrl.push(ProgressQueryPage);
  }

  /**
   * 调到网站链接
   */
  goconnection() {

    this.navCtrl.push(ConnectionPage);
  }

  goBusinesGuide() {

    this.navCtrl.push(BusinessPage);
  }

  gocomplexquery() {
    this.navCtrl.push(ComplexQueryPage);
  }

  /**
   * 前往我的业务
   */
  goMyBusinessSerial() {

    this.navCtrl.push(MyBusinessSerialNumberPage);
  }

}
