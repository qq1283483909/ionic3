import { CommonHelper } from './../../models/commonHelper';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController  } from 'ionic-angular';
 

@IonicPage()
@Component({
  selector: 'page-protocol-model',
  templateUrl: 'protocol-model.html',
})
export class ProtocolModelPage {
  myParam: string;

  modelNumber: any = {
    name: "同意协议",
    countdown: 10,
    disable: true
  }

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    params: NavParams,
    private commonHelper: CommonHelper
  ) {
    this.myParam = params.get('myParam');
    if(!this.commonHelper.isTimetrue()){
      this.modelSettime();
      this.commonHelper.timeAdd();
    }
 
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }


  /**
 * 同意协议倒计时
 */
modelSettime() {
  if (this.modelNumber.countdown == 0) {
      this.modelNumber.name = "同意协议";
      this.modelNumber.disable = true;
      return;
  } else {
      this.modelNumber.countdown--;
      this.modelNumber.disable = false
  }
  setTimeout(() => {
      this.modelNumber.name = "同意协议（" + this.modelNumber.countdown + ")";
          this.modelSettime();
  }, 1000);
}

}
