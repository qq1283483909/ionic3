import { NewsProvider } from './../../providers/news/news';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BusinessthirdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-businessthird',
  templateUrl: 'businessthird.html',
})
export class BusinessthirdPage {
  btmltt : string 
  businnn: string

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private newsProvider: NewsProvider
  ) {

    this.businnn = this.navParams.get('Id');
  }

  ionViewDidLoad() {
    this.newsProvider.getbusinessguideinformation(this.businnn).subscribe(res =>{
      // console.log(res);
      this.btmltt = res.Content;
    })
  }

}
