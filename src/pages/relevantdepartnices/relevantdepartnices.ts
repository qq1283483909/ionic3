import { NewsProvider, introst, IntrosModeModule } from './../../providers/news/news';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScrollHideConfig } from '../../directives/scroll-hidden/scroll-hidden';


/**
 * Generated class for the RelevantdepartnicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()       
@Component({
  selector: 'page-relevantdepartnices',
  templateUrl: 'relevantdepartnices.html',
})
export class RelevantdepartnicesPage {
  headerScrollConfig: ScrollHideConfig = <ScrollHideConfig>{ cssProperty: 'margin-top' };
  data: introst[];
  Spread: string;
  center : string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private newsProvider: NewsProvider,
  ) {

    this.Spread = this.navParams.get('Id');
  }

      
  //获取IInfoModel - 》Name、Infos的方法
  ionViewDidLoad() {

    this.newsProvider.getIInfoModeName(this.Spread).subscribe(res => {
    this.data = res.Infos;
    this.center = res.Name;
    })
  }

}
