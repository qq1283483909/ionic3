import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Thumbnail } from 'ionic-angular';
import { MybusinessProvider, mybusinessMoedl, businessChildrenModel } from '../../providers/mybusiness/mybusiness';
import { ElementRef } from '@angular/core';
import { ApplicationInformationPage } from '../application-information/application-information';

/**
 * Generated class for the BusinessPurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-purchase',
  templateUrl: 'business-purchase.html',
})
export class BusinessPurchasePage {
  Isselect: boolean = false;
  ID: string;
  businessList: object;
  businessData = [];
  mybusinessList: mybusinessMoedl[] = [];
  children: businessChildrenModel[] = [];
  meobj:object;
  message : string;
  IsSelectAll:boolean = true;

  selectCount:number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public mybusiness: MybusinessProvider,
    public element: ElementRef) {
    this.ID = this.navParams.get('id');
    // this.mybusinessList = this.navParams.get('data')
    this.showList();
  }

  showList() {
    this.mybusiness.getBusinessPurchase(this.ID).subscribe(res => {
      if (res.StateCode == 1) {
        this.businessList = res['Data'];
        this.businessData = [this.businessList];
        this.mybusinessList = this.businessData;
        this.children = this.mybusinessList[0].Children;
        for (var j = 0; j < this.children.length; j++) {
          this.children[j].Isselect = false;
        }
      } else {
        alert(res.Message);
      }
    }), error => {
      alert('出错');
    };

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessPurchasePage');
  }



  /**
   * 选择
   * @param i 
   */
  changechex(i) {

    this.children[i].Isselect = !this.children[i].Isselect;

    var total = 0;

    for (var j = 0 ; j < this.children.length ; j++) {

        if(this.children[j].Isselect){

          this.IsSelectAll = false;

          total += 1;
        }

    }

    if (total == 0){

      this.IsSelectAll = true;
    }

    this.selectCount = total;
 
  }

  myclass(i) {
    return {
      "icon-choose": this.children[i].Isselect == false,//未选中状态
      "icon-xuanze": this.children[i].Isselect == true//选中状态
    }
  }
  goApplicationInformationPage(ID: string, ProjectTypeid: string) {
    this.navCtrl.push(ApplicationInformationPage, {
      id: ID,
      ProjectTypeId: ProjectTypeid
    });
  }

  /**
   * 全选或者全部取消
   */
  selectAll() {

      for (var i = 0 ; i < this.children.length ; i++) {

        this.children[i].Isselect = this.IsSelectAll;

      }

      this.IsSelectAll = !this.IsSelectAll;

      this.selectCount = this.IsSelectAll ? 0 : this.children.length;

    }
    getbtn(){
      for (var j = 0 ; j < this.children.length ; j++) {
        if(this.children[j].Isselect){
          this.mybusiness.getAddappointmentlist(this.children[j]).subscribe(res => {
            if (res.StateCode == 1) {
              this.meobj = res;
            } else {
              alert(res.Message);
            }
          }), error => {
            alert('出错');
          };
        }
    }
    }

}
