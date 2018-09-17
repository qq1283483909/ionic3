import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { MybusinessProvider, mybusinessMoedl } from '../../providers/mybusiness/mybusiness';
import { CommonHelper } from '../../models/commonHelper';
import { BatchListPage } from '../batch-list/batch-list';
import { BusinessPurchasePage } from '../business-purchase/business-purchase';
/**
 * Generated class for the MyBusinessSerialNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-business-serial-number',
  templateUrl: 'my-business-serial-number.html',
})
export class MyBusinessSerialNumberPage {

  /**
 * 页码
 */
  page: number = 1;

  /**
   * 加载更多
   */
  FootisEnable: boolean = false;

  /**
   * 模型数组
   */
  mybusinessList: mybusinessMoedl[] = [];

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public mybusinessProvide: MybusinessProvider, public helper: CommonHelper) {
  }

  ionViewDidLoad() {

    this.getData();
  }

/**
 * 获取首页数据
 */
getData() {
  this.mybusinessProvide.getMyBusinessLoist(this.page).subscribe(res => {

    if (res.StateCode == 1) {
      var tempArr = <mybusinessMoedl[]>JSON.parse(JSON.stringify(res.Data['Items']));
      
      this.FootisEnable = tempArr.length < 10 ? false : true;

      this.mybusinessList = [];

      for (var i = 0 ; i < tempArr.length ; i++) {

        var model = tempArr[i];
        
        var Tips = '';

        if (model.Closed){

          Tips = '已关闭,请点击查看';
        }
        else if(model.Finished){
          Tips = '已完成注销,请通知权利人到网点盖章';
        }else if(model.UnChecked){
          Tips = '审核不通过';
        }else if(model.IsInRsv){
          Tips = '正在预约';
        }else if(model.CanDate){

          if(model.FinishDate){
            Tips = '已预约';
          }else{

          }
        }else if(model.IsPay){
          Tips = '审核完成,请交费';
        }else if(model.NeedAppend || model.Rejected){
          Tips = '已反馈';
        }else if(model.Accepted){
          Tips = '已受理';
        }else if(model.Locked){
          Tips = '已提交(排队:' + model.QueueIndex + ')';
        }else{
          Tips = '';
        }

        model.Tips = Tips;

        this.mybusinessList.push(model);
      }

    } else {

      this.helper.presentToast('网络出错', 2000);
    }
  }, err => {
    this.helper.presentToast('请求失败', 2000);
  });
}

  /**
   * 下拉刷新
   */
  doRefresh(refresher) {
    console.log("下拉刷新");

    this.page = 1;

    this.mybusinessProvide.getMyBusinessLoist(this.page).subscribe(res => {

      refresher.complete();

      if (res.StateCode == 1) {

        var tempArr = <mybusinessMoedl[]>JSON.parse(JSON.stringify(res.Data['Items']));
      
      this.FootisEnable = tempArr.length < 10 ? false : true;

      this.mybusinessList = [];

      for (var i = 0 ; i < tempArr.length ; i++) {

        var model = tempArr[i];

        var Tips = '';

        if (model.Closed){

          Tips = '已关闭,请点击查看';
        }
        else if(model.Finished){
          Tips = '已完成注销,请通知权利人到网点盖章';
        }else if(model.UnChecked){
          Tips = '审核不通过';
        }else if(model.IsInRsv){
          Tips = '正在预约';
        }else if(model.CanDate){

          if(model.FinishDate){
            Tips = '已预约';
          }else{

          }
        }else if(model.IsPay){
          Tips = '审核完成,请交费';
        }else if(model.NeedAppend || model.Rejected){
          Tips = '已反馈';
        }else if(model.Accepted){
          Tips = '已受理';
        }else if(model.Locked){
          Tips = '已提交(排队:' + model.QueueIndex + ')';
        }else{
          Tips = '';
        }

        model.Tips = Tips;

        this.mybusinessList.push(model);
      }

      } else {

        this.helper.presentToast('网络出错', 2000);
      }
    }, err => {

      refresher.complete();

      this.helper.presentToast('网络出错', 2000);
    });

  }

  /**
     * 上拉加载
     * @param infiniteScroll 可以通过此参数设置什么时候禁止滚动 和加载完成的动画
     */
  doInfinite(infiniteScroll) {

    this.page += 1;
    this.mybusinessProvide.getMyBusinessLoist(this.page).subscribe(res => {

      infiniteScroll.complete();

      if (res.StateCode == 1) {

        let tempArr = <mybusinessMoedl[]>JSON.parse(JSON.stringify(res.Data['Items']));
        //往数组里面添加模型
        for (var i = 0; i < tempArr.length; i++) {

          var model = tempArr[i];

          var Tips = '';

          if (model.Closed) {

            Tips = '已关闭,请点击查看';
          }
          else if (model.Finished) {
            Tips = '已完成注销,请通知权利人到网点盖章';
          } else if (model.UnChecked) {
            Tips = '审核不通过';
          } else if (model.IsInRsv) {
            Tips = '正在预约';
          } else if (model.CanDate) {

            if (model.FinishDate) {
              Tips = '已预约';
            } else {

            }
          } else if (model.IsPay) {
            Tips = '审核完成,请交费';
          } else if (model.NeedAppend || model.Rejected) {
            Tips = '已反馈';
          } else if (model.Accepted) {
            Tips = '已受理';
          } else if (model.Locked) {
            Tips = '已提交(排队:' + model.QueueIndex + ')';
          } else {
            Tips = '';
          }

          model.Tips = Tips;

          this.mybusinessList.push(model);
        }

        console.log('总个数' + this.mybusinessList.length);

        if (tempArr.length < 10) {
          this.FootisEnable = false;
        }
      }
      else {

        this.page -= 1;

        this.helper.presentToast('网络出错', 2000);
      }
    }, error => {

      this.helper.presentToast('网络出错', 2000);
      /**
       * 为了保证请求失败时页数不增加---需要自减1
       */
      this.page -= 1;
    });

  }

  goBusinessPurchasePage(ID: string) {
    this.navCtrl.push(BusinessPurchasePage, {
      id: ID
      // , data:mybusinessList
    });
  }
}
