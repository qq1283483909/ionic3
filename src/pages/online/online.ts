import { RequestCacheWithMap } from './../../infrastructure/request-cache';
import { registerModel } from './../../providers/account/account';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TypelistProvider, listContentModule, listItemsModule } from '../../providers/typelist/typelist';
import { OnlinePreviewPage } from '../online-preview/online-preview';
/**
 * 在线办理页面ts
 */
@IonicPage()
@Component({
  selector: 'page-online',
  templateUrl: 'online.html',
})
export class OnlinePage {
  List: listItemsModule[];
  // public Type;
  type: string;
  i: string
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private accountPro: TypelistProvider
  ) {
    this.type = this.navParams.get('Type');
  }

  showType() {
    this.accountPro.getTypeList().subscribe(res => {
      if (res.StateCode ==1) {
      const arr = res.Data.filter(d => d.DType == this.type);
      if (arr.length > 0) {
        this.List = arr[0].DItems;
      }
      }
      else if(res.StateCode == 0){
        alert(res.Message);
      }
    })
  }
  

  ionViewDidLoad() {
    this.showType();
  }

  goPreView(type: listItemsModule[]) {
    this.navCtrl.push(OnlinePreviewPage, { Items: type });
  }
  myclass(i) {
    return {
      "back-yugao": i.Type === "预告类",
      "back-zhuxiao": i.Type === "注销类",
      "back-chushi": i.Type === "初始类",
      "back-diya": i.Type === "抵押类",
      "back-biangeng": i.Type === "变更类",
      "back-qita": i.Type === "其他类",
      "back-zhuanyi": i.Type === "转移类"
    };
    //  return classes;
  }

}
