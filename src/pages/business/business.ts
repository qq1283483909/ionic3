import { NewsProvider } from './../../providers/news/news';
import { LoginPage } from './../login/login';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BusinesssecondPage } from '../businesssecond/businesssecond';

/**
 * Generated class for the BusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
})
export class BusinessPage {
     public zhinan;
     public nan;
     public Id;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private newsProvider:NewsProvider
  ) {
    this.tos();
  }
  tos(){
    this.newsProvider.getbusiness().subscribe(res =>{
      this.zhinan = res;
      this.nan = this.zhinan.GuideList;
      // console.log(this.zhinan);

     })
  }
  goto(guide:string){
    this.navCtrl.push(BusinesssecondPage,{Id:guide}); 
  }

}

