import { CurrencyString } from './../../infrastructure/currency-string';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QueryProvider } from './../../providers/query/query';
import { CommonHelper } from "../../models/commonHelper";
/**
 * 个人查档查档记录页面
 * 包含个人查档和机构查档的记录
 */
@IonicPage()
@Component({
  selector: 'page-queryhistor',
  templateUrl: 'queryhistor.html',
})
export class QueryhistorPage {

  /**
   * 初始化字符串
   */
  initString = {
    index: 0,
    pet: '',
    tabA: [],
    ListA: [],
    ListB: [],
    /**
     *  HistoryType 是否显示暂无历史记录
     */
    HistoryTypeA: false,
    HistoryTypeB: false,
    cdjlName: CurrencyString.cdjlName,
    gkdcxName: CurrencyString.gkdcxName,
    mxdcxName: CurrencyString.mxdcxName,
    grdcxName: CurrencyString.grdcxName,


  }

  /**
   * 公开档传参的json
   * isOrganization:false 是个人档,true 是机构档
   */
  openJson = {
    page: 1,
    pagesize: 10,
    isOrganization: false,
  };

  /**
   * 第二个接口的传参 
   * 个人档或者名下档
   */
  bJson = {
    page: 1,
    pagesize: 10,
  }

  /**
   * 下拉加载的变量
   */
  downRefresher: any;


  /**
   * 下拉加载的判断
   */
  downRefresherSum: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public queryProvider: QueryProvider, public commonHelper: CommonHelper) {
    /**
     * @param index 0是个人查档  1是机构查档  
     * @param tabsName 当前的tab焦点
     * @param tabsArray 当前的tabs 名字数组 用来迭代 
     */
    this.initString.pet = navParams.get('tabsName');
    this.initString.index = navParams.get('index');
    this.initString.tabA = navParams.get('tabsArray');
  }


  ionViewDidLoad() {
    this.init(() => { });
  }

  /**
   * 点击头部切换
   * 判断是否未点击
   */
  petChanged() {
    if (this.initString.ListA.length == 0 && !this.initString.HistoryTypeA) {
      this.init(() => {});
    }
    if(this.initString.ListB.length == 0 && !this.initString.HistoryTypeB){
      this.init(() => {});
    } 
  }


  goBack() {
    this.navCtrl.pop();
  }

  /**
   * 页面初始化
   * @param then 页面初始化后调用的函数 方便上拉刷新时调用关闭`
   */
  init(then?: Function) {
    /**
     * 判断页面是否关闭了下拉加载
     * 如果关闭下拉加载，上拉刷新页面时重新开启
     */
    if (this.downRefresherSum == 1) {
      this.downRefresherSum = 0;
      this.downRefresher.enable(true)
    }


    switch (this.initString.pet) {
      /**
       * 判断是否是公开档查询
       */
      case this.initString.gkdcxName:
        this.openJson.page = 1;
        this.initString.ListA = [];
        this.initListA(then);
        break;
      /**
     * 判断是否是个人档
     */
      case this.initString.grdcxName:
        this.bJson.page = 1;
        this.initString.ListB = [];
        this.initListB(then);
        break;

      /**
    * 判断是否是名下档
    */
      case this.initString.mxdcxName:
        this.bJson.page = 1;
        this.initString.ListB = [];
        this.initListB(then);
        break;
    }
  }

  /**
   * 初始化列表
   */
  initListB(then?: Function) {
    let url: any;
    switch (this.initString.index) {
      case 0:
        url = this.queryProvider.getPersonArchivalList(this.bJson);
        break;

      case 1:
        url = this.queryProvider.getPersonOrganization(this.bJson);
        break;
    }
    url.subscribe(data => {
      if (data.StateCode == 1) {
        then(data); //回调
        for (let i in data.Data) {
          this.initString.ListB.push(data.Data[i]);
        }
        /**
         * 0则显示暂无查档数据
         */
        if (this.initString.ListB.length == 0) {
          this.initString.HistoryTypeB = true;
        }
      } else {
        this.commonHelper.presentToast(data.Message);
      }
    })
  }

  /**
   * 初始化列表
   */
  initListA(then?: Function) {
    switch (this.initString.index) {
      case 0:
        this.openJson.isOrganization = false;
        break;

      case 1:
        this.openJson.isOrganization = true;
        break;
    }
    this.queryProvider.getOpenArchivalList(this.openJson).subscribe(data => {
      if (data.StateCode == 1) {
        then(data); //回调 
        for (let i in data.Data) {
          this.initString.ListA.push(data.Data[i]);
        }
        /**
         * 0则显示暂无查档数据
         */
        if (this.initString.ListA.length == 0) {
          this.initString.HistoryTypeA = true;
        }
      } else {
        this.commonHelper.presentToast(data.Message);
      }
    })
  }

  /**
   * 下拉刷新页面
   * @param refresher 据页面传回来的event
   */
  doRefresh(refresher: any) {
    this.init(function () {
      refresher.complete();
    });
  }

  /**
   * 下滑加载数据
   *  @param refresher 根据页面传回来的event
   */
  doInfinite(refresher: any) {
    this.downRefresherSum = 1;
    this.downRefresher = refresher;

    switch (this.initString.pet) {
      /**
       * 判断是否是公开档查询
       */
      case this.initString.gkdcxName:
      this.openJson.page++;
        this.initListA(data => { 
          /**
           * *  判断获取数量是否小于10 小于10不再下拉滑动
           * */
          let arr = [];
          for (let index in data.Data) {
            arr.push(data.Data[index]);
          }
          if (arr.length < 10) {
            refresher.enable(false);
            this.commonHelper.presentToast("没有更多的数据");
            return false;
          }
          refresher.complete();
        });
        break;
      /**
     * 判断是否是个人档
     */
      case this.initString.grdcxName:
        this.bJson.page++;
        this.initListB(data => {
           /**
           * *  判断获取数量是否小于10 小于10不再下拉滑动
           * */
          let arr = [];
          for (let index in data.Data) {
            arr.push(data.Data[index]);
          }
          if (arr.length < 10) {
            refresher.enable(false);
            this.commonHelper.presentToast("没有更多的数据");
            return false;
          }
          refresher.complete();
        });
        break;

      /**
    * 判断是否是名下档
    */
      case this.initString.mxdcxName:
        this.bJson.page++;
        this.initListB(data => {
           /**
           * *  判断获取数量是否小于10 小于10不再下拉滑动
           * */
          let arr = [];
          for (let index in data.Data) {
            arr.push(data.Data[index]);
          }
          if (arr.length < 10) {
            refresher.enable(false);
            this.commonHelper.presentToast("没有更多的数据");
            return false;
          }
          refresher.complete();
        });
        break;
    } 
  }
}
