import { CommonHelper } from './../../models/commonHelper';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { BuildingsearchProvider, bankModel, buildSearchBankModel, BuildModel } from '../../providers/buildingsearch/buildingsearch';
import { FloorInformationPage } from '../floor-information/floor-information';
/**
 * Generated class for the ComplexQueryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complex-query',
  templateUrl: 'complex-query.html',
})
export class ComplexQueryPage {

  /**
   * 银行列表
   */
  bankList:buildSearchBankModel[] = [];

  /**
   * 银行列表默认值
   */
  defaultValue:string;

  /**
   * 选择绑定的值
   */
  selectVale:string;

  /**
   * 楼层列表
   */
  buildList:BuildModel[] = [];

  /**
   * 搜索的字符串
   */
  searchStr:string;

  /**
   * 页码
   */
  page:number = 1;

  /**
   * 是否可以继续加载
   */
  FootisEnable:boolean = true;


  constructor(public navCtrl: NavController, public navParams: NavParams, public ListProvide:BuildingsearchProvider,private helper:CommonHelper) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplexQueryPage');

    this.ListProvide.getBuildSearchBankList('d4-1').subscribe(res => {

      if (res['StateCode'] == 1) {

        this.bankList = <buildSearchBankModel[]>JSON.parse(JSON.stringify(res.Data));

        if (this.bankList.length > 0) {

          this.defaultValue = this.bankList[0].Value;

          this.selectVale = this.bankList[0].Key;
        }

      }else{

        this.helper.presentToast('网络出错',2000);

    }
    } ,err => {

      this.helper.presentToast('请求失败',2000);
    });
  }

  /**
   * 点击搜索
   */
  searchClick() {

    this.page = 1;

    this.FootisEnable = true;

    this.ListProvide.getSearchBuildList(this.searchStr,this.page).subscribe( res => {

      if (res['StateCode'] == 1) {

        this.buildList = <BuildModel[]>JSON.parse(JSON.stringify(res.Data['Items']));

        if (this.buildList.length < 10) {
          this.FootisEnable = false;
        }

      }else{

        this.helper.presentToast('网络出错',2000);

        this.FootisEnable = false;

    }
    },err => {

      this.helper.presentToast('请求失败!',2000);

      this.FootisEnable = false;
    });
  }

   /**
   * 上拉加载
   * @param infiniteScroll 可以通过此参数设置什么时候禁止滚动 和加载完成的动画
   */
  doInfinite(infiniteScroll) {

    console.log(this.page);

    this.page += 1;
    this.ListProvide.getSearchBuildList(this.searchStr,this.page).subscribe(res => {

      if (res['StateCode'] == 1) {

      let tempArr = <BuildModel[]>JSON.parse(JSON.stringify(res.Data['Items']));
      for (var i = 0; i < tempArr.length; i++) {
        this.buildList.push(tempArr[i]);
      }

      console.log('总个数' + this.buildList.length);
      infiniteScroll.complete();
      if (tempArr.length < 10) {
        this.FootisEnable = false;
      }
    }
    else{
      this.helper.presentToast('网络出错!',2000);

      this.FootisEnable = false;

      this.page -= 1;
    }
    }, error => {
      this.helper.presentToast('请求失败!',2000);

      this.FootisEnable = false;

      this.page -= 1;
    });

  }

gofloorInformation(UnitNo:string) {

  this.navCtrl.push(FloorInformationPage,{
    bdcUnitNo:UnitNo,
    bankID:this.selectVale,
  });
}

}
