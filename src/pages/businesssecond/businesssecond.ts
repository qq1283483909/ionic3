import { BusinessthirdPage } from './../businessthird/businessthird';
import { NewsProvider, bussinItem } from './../../providers/news/news';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BusinesssecondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-businesssecond',
  templateUrl: 'businesssecond.html',
})
export class BusinesssecondPage {

  btmlst: bussinItem[];
  busin: string;
  bussiness :string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private newsProvider: NewsProvider,
  ) {
    this.busin = this.navParams.get('Id');

  }

  ionViewDidLoad() {

    this.newsProvider.getbusinessguidelist(this.busin).subscribe(res => {
     
      this.bussiness = res.Name;
      this.btmlst = res.SubList;
      // console.log(res);

    })
  }

  gotv(guideList:string) {

    this.navCtrl.push(BusinessthirdPage, { Id:guideList});
  }

}
