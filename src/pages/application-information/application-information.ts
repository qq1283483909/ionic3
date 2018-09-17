import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MybusinessProvider, mybusinessMoedl } from '../../providers/mybusiness/mybusiness';

/**
 * Generated class for the ApplicationInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-application-information',
  templateUrl: 'application-information.html',
})
export class ApplicationInformationPage {
  ID: string;
  ProjectTypeId: string;
  appLicationList: object;
  appLicationData = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public mybusiness: MybusinessProvider) {
    this.ID = this.navParams.get('id');
    this.ProjectTypeId = this.navParams.get('ProjectTypeId');
    // this.mybusinessList = this.navParams.get('data')
    this.showList();
  }

  showList() {
    this.mybusiness.getApplicationInformation(this.ID, this.ProjectTypeId).subscribe(res => {
      if (res.StateCode == 1) {
        this.appLicationList = res['Data'];
        this.appLicationData = [this.appLicationList];
        // console.log(this.appLicationData);
      } else {
        alert(res.Message);
      }
    }), error => {
      alert('出错');
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicationInformationPage');
  }
}
