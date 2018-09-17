import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TypelistProvider, listContentModule, listItemsModule } from '../../providers/typelist/typelist';
import { PersonalfileOpenfilePage } from '../personalfile-openfile/personalfile-openfile';

/**
 * 业务列表
 */

@IonicPage()
@Component({
  selector: 'page-online-preview',
  templateUrl: 'online-preview.html',
})
export class OnlinePreviewPage {
  PersonalfileOpenfilePage = this.PersonalfileOpenfilePage;
  type: listItemsModule[];
  Type: string;
  items: listContentModule[] = [];
  xlink: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private accountPro: TypelistProvider
  ) {
    this.type = this.navParams.get('Items');
    this.Type = this.navParams.get('Items').Type;
    this.items = this.navParams.get('Items').Items;
    // this.Type = this.navParams.get('ontype');
    if (this.Type == "预告类") {
      this.xlink = "#icon-yugao-";
    }
    else if (this.Type == "初始类") {
      this.xlink = "#icon-chushi-";
    }
    else if (this.Type == "注销类") {
      this.xlink = "#icon-zhuxiaolei";
    }
    else if (this.Type == "变更类") {
      this.xlink = "#icon-biangenglei";
    }
    else if (this.Type == "抵押类") {
      this.xlink = "#icon-diyalei";
    }
    else if (this.Type == "其他类") {
      this.xlink = "#icon-qitalei";
    }
    else if (this.Type == "转移类") {
      this.xlink = "#icon-zhuanyilei";
    }
  }
  myclass() {
    return {
      "color-yugao": this.Type === "预告类",
      "color-zhuxiao": this.Type === "注销类",
      "color-chushi": this.Type === "初始类",
      "color-diya": this.Type === "抵押类",
      "color-zhuanyi": this.Type === "转移类",
      "color-biangeng": this.Type === "变更类",
      "color-qita": this.Type === "其他类"
    };
    //  return classes;
  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad OnlinePreviewPage');

  }
  goBusiness(items:listContentModule) {
    this.navCtrl.push(PersonalfileOpenfilePage, {
      Items : items });
  }

}
