import { NewsProvider, newsdetailitem } from './../../providers/news/news';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScrollHideConfig } from '../../directives/scroll-hidden/scroll-hidden';
import { ModalController } from 'ionic-angular';
import { PreviewPicturePage } from '../preview-picture/preview-picture';

/**
 * Generated class for the NewsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage {

  paras: string;

  headerScrollConfig: ScrollHideConfig = <ScrollHideConfig>{ cssProperty: 'margin-top' };
  htmlstr: string;

  newsdetailmodel: newsdetailitem = <newsdetailitem>{};

  constructor(public navCtrl: NavController, public navParams: NavParams, private newsprovide: NewsProvider, private navpar: NavParams, private modalCtrl: ModalController) {

    this.paras = this.navParams.get('id');
  }


  /**
   * 视图加载完
   */
  ionViewDidLoad() {

    this.newsprovide.getNewdetail(this.paras).subscribe(res => {

      this.htmlstr = res.Content;

      this.newsdetailmodel = res;
    });
    console.log('ionViewDidLoad NewsDetailPage');
  }

  /**
   * 图片浏览器
   */
  pictureBroswer() {

    if (this.newsdetailmodel) {
      const picturePaths = [];

      picturePaths.push(this.newsdetailmodel.TitleImg);

      this.modalCtrl.create(PreviewPicturePage, { 'initialSlide': 0, 'picturePaths': picturePaths }).present();
    }

  }

}
