import { CheckrecordsPage } from './../checkrecords/checkrecords';
import { ScanPage } from './../scan/scan';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CheckserveProvider, checkrecordsItem } from './../../providers/checkserve/checkserve';
import { CheckdetailPage } from '../checkdetail/checkdetail';
import { Device } from '@ionic-native/device';  
/**
 * Generated class for the CheckservicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkservice',
  templateUrl: 'checkservice.html',
})
export class CheckservicePage {


  //查验记录模型 --一条
  checkItem: checkrecordsItem;

  nav: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private checkserve: CheckserveProvider, private checkrecordshttp: CheckserveProvider, private device: Device
  ) {

    this.nav = navCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckservicePage');
  }

  onSwipeRight(e) {
    /**
     * 偏移方向4是向右 2是向左
     */
    if (e.offsetDirection == 4) {
      if (this.navCtrl.canGoBack && this.device.platform != 'iOS') {
        this.navCtrl.pop();
      }
    }
  }

  /**
   * 显示最近的一条数据
   */
  ngOnInit() {

    this.checkrecordshttp.getcheckrecordes(1).subscribe(res => {

      let temp = <checkrecordsItem[]>JSON.parse(res.Data['items']);

      if (temp.length > 0) {

        this.checkItem = temp[0];
      }

    }, error => {

      console.log('错误' + error);
    });
  }

  /**
   * 扫码
   */
  scan() {

    this.navCtrl.push(ScanPage);

  }

  /**
 * 进入查验详情页面
 * @param index 索引
 */
  selectClick(index: number) {

    this.navCtrl.push(CheckdetailPage, {
      htmlStr: this.checkItem.HtmlContent
    });
  }

  /**
   * 查看记录
   */

  checkrecords() {

    this.navCtrl.push(CheckrecordsPage);
  }
}
