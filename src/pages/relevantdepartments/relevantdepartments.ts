import { NewsProvider } from './../../providers/news/news';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RelevantdepartnicesPage } from '../relevantdepartnices/relevantdepartnices';

/**
 * Generated class for the RelevantdepartmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relevantdepartments',
  templateUrl: 'relevantdepartments.html',
})
export class RelevantdepartmentsPage {
  public related;
  public department;
  public Id;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private newsProvider: NewsProvider
  ) {
    this.relevant();
  }

   //获取IntrosModel信息 方法
  relevant() {
    this.newsProvider.getIntrosMode().subscribe(res => {
     
      this.related = res;
      this.department = this.related.Introduction;
    })
  
  }

  //跳转到RelevantdepartnicesPage页面
  gotu(letter: string) {
    this.navCtrl.push(RelevantdepartnicesPage,{Id:letter});
  }

}
