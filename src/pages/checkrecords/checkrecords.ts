import { CheckdetailPage } from './../checkdetail/checkdetail';
import { CheckserveProvider, checkrecordsItem } from './../../providers/checkserve/checkserve';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThrowStmt } from '../../../node_modules/@angular/compiler';

/**
 * Generated class for the CheckrecordsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkrecords',
  templateUrl: 'checkrecords.html',
})
export class CheckrecordsPage {

  /**
   * 查验记录model数组
   */
  checkrecordArr: checkrecordsItem[] = [];

  /**
   * 页码
   */
  page:number = 1;

  /**
   * 加载更多
   */
  FootisEnable: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private checkrecordshttp: CheckserveProvider) {
  }

  ionViewDidLoad() {


    console.log('ionViewDidLoad CheckrecordsPage');
  }

    /**
   * 下拉刷新
   */
  doRefresh(refresher) {
    console.log("下拉刷新");

    this.page = 1;
    this.checkrecordshttp.getcheckrecordes(this.page).subscribe(res => {
      this.checkrecordArr = <checkrecordsItem[]>JSON.parse(res.Data['items']);

      refresher.complete();

      this.FootisEnable = this.checkrecordArr.length < 10 ? false : true;

    }, err => {
      this.page = 1;
    });

  }

/**
   * 上拉加载
   * @param infiniteScroll 可以通过此参数设置什么时候禁止滚动 和加载完成的动画
   */
  doInfinite(infiniteScroll) {

    console.log('上拉加载');
    console.log(this.page);

    this.page += 1;
    this.checkrecordshttp.getcheckrecordes(this.page).subscribe(res => {

      let tempArr = <checkrecordsItem[]>JSON.parse(res.Data['items']);
      for (var i = 0; i < tempArr.length; i++) {
        this.checkrecordArr.push(tempArr[i]);
      }

      console.log('总个数' + this.checkrecordArr.length);
      infiniteScroll.complete();
      if (tempArr.length < 10) {
        this.FootisEnable = false;
      }
    }, error => {
      console.log('请求失败');

      /**
       * 为了保证请求失败时页数不增加---需要自减1
       */
      this.page -= 1;
    });

  }

  /**
   * 初始化
   */
  ngOnInit() {

    this.checkrecordshttp.getcheckrecordes(this.page).subscribe(res => {

    if (res.StateCode == 1){

      this.checkrecordArr = <checkrecordsItem[]>JSON.parse(res.Data['items']);

      this.FootisEnable = this.checkrecordArr.length < 10 ? false : true;

    if (this.checkrecordArr.length < 1){

      alert('暂无记录');
    }
    }

    }, error => {

      alert('请求失败!');
    });
  }

  /**
   * 进入查验详情页面
   * @param index 索引
   */
  selectClick(index: number) {

    this.navCtrl.push(CheckdetailPage, {
      htmlStr: this.checkrecordArr[index].HtmlContent
    });
  }

}


