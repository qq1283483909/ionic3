import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CheckdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkdetail',
  templateUrl: 'checkdetail.html',
})
export class CheckdetailPage {

  /**
   * 传递过来的参数
   */
  paras:string;

  /**
   * 将要绑定的html数据
   */
  htmlstr:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.paras = navParams.get('htmlStr');

    /**
     * JSON.paras一次
     */
    this.htmlstr = JSON.parse( this.paras);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckdetailPage');
  }

}
