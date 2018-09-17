import { SelectDate } from './../../components/enterprise/enterprise';
import { QueryProvider } from './../../providers/query/query';
import { CommonHelper } from './../../models/commonHelper';
import { UserInfo } from './../../infrastructure/user-info';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AuthActionSheet } from './../../models/AuthActionSheet';
import { FormBuilder, FormGroup } from "@angular/forms";
import { CurrencyString, QueryString } from './../../infrastructure/currency-string';
import { QueryhistorPage } from './../queryhistor/queryhistor';
import { QueryEntity } from './../../infrastructure/query-entity';
/**
 * 机构查档页面
*/

@IonicPage()
@Component({
  selector: 'page-queryOtherInformation',
  templateUrl: 'queryOtherInformation.html',
})
export class QueryOtherInformationPage {

  constructor(public navCtrl: NavController, private queryEntity: QueryEntity, public fb: FormBuilder, public queryProvider: QueryProvider, public navParams: NavParams, public userInfo: UserInfo, public authActionSheet: AuthActionSheet, public modalCtrl: ModalController, public alertCtrl: AlertController, public commonHelper: CommonHelper) {
    this.infoForm = queryEntity.CreateInfoForm(this.infoForm, 1);
  }

  /**
   * 初始化字符串
   */
  initString = {
    /**
    ** 个人查档 tabs 的name
    */
    pet: QueryString.queryOtherInformationPet,

    /**
   * 2级tabs的name 
   */
    tabs: QueryString.queryOtherInformationTabs,

    tabA: [
      { name: CurrencyString.gkdcxName },
      { name: CurrencyString.grdcxName }
    ],
    tabB: [
      { name: CurrencyString.bdcqzName },
      { name: CurrencyString.yfqzName },
      { name: CurrencyString.qtName },
    ],
    gkdcxName: CurrencyString.gkdcxName,
    grdcxName: CurrencyString.grdcxName,
    bdcqzName: CurrencyString.bdcqzName,
    yfqzName: CurrencyString.yfqzName,
    qtName: CurrencyString.qtName,

    cxgkdName: CurrencyString.cxgkdName,
    cxbrName: CurrencyString.cxbrName,
    cxjtcyName: CurrencyString.cxjtcyName,
    cdjlName: CurrencyString.cdjlName,
  }


  /**
   * 2级tabs的name 
   */
  tabs: string = '不动产权证';

  open = {
    typeTxt: CurrencyString.nnsbdcqzName,
    no: '',
    noo: '',
    YTypes: [
      {
        id: 1,
        name: CurrencyString.yfyzName,
        limit: 7
      }, {
        id: 2,
        name: CurrencyString.yftzName,
        limit: 6,
      },
    ],
    YTypeTxt: CurrencyString.yfyzName,
    Yno: '',
    code: '',
    value: '',
  };

  /**
   * 机构查档 公开档备案企业传的值
   */
  companiesJson = {
    queryIndex: 2
  }
  /**
   * 机构查档 个人档备案企业传的值
   */
  companiesPersonal = {
    queryIndex: 0
  }

  /**
   * 机构查档->公开档 备案企业
   */
  infoForm: FormGroup;

  /**
   * 机构查档->个人档 备案企业
   */
  recordPersona: SelectDate = {
    index: 0,
    list: [],
    value: ''
  };

  /**
   * 机构查档->公开档 备案企业
   */
  recordCompanies: SelectDate = {
    index: 0,
    list: [],
    value: ''
  };

  ionViewDidLoad() {

    /**
     * 根据机构查档 公开档tabs 发出备案企业的请求
     * 名下档 QueryPower 1： 查验 SearchPower 2： 公开档 PublicQuery  
     */
    this.getCompanies(2, data => {
      this.recordCompanies.list = data.Data
      this.recordCompanies.value = this.recordCompanies.list[this.recordCompanies.index].Value;
    })
    /**
     * 根据机构查档 个人档tabs 发出备案企业的请求
     * 名下档 QueryPower 1： 查验 SearchPower 2： 公开档 PublicQuery  
     */
    this.getPersonal(0, data => {
      this.recordPersona.list = data.Data;
      this.recordPersona.value = this.recordPersona.list[this.recordPersona.index].Value;
    })
  }
  /**
  * 查询记录
  */
  queryHistory() {
    /**
     * 跳转到记录
     * @param index 0是个人查档  1是机构查档  
     * @param tabsName 当前的tab焦点
     * @param tabsArray 当前的tabs 名字数组 用来迭代 
     */
    let profileModal = this.modalCtrl.create(QueryhistorPage, { index: 1, tabsName: this.initString.pet, tabsArray: this.initString.tabA, });
    profileModal.present();
  }

  /**
   * 点击机构查档->查询公开档
   */
  goPersonArchivalQuery() {

    if (this.open.value == '') {
      this.commonHelper.presentToast("您输入的权证信息有误，请重新输入！");
      return false;
    }

    /**
   * 查询的deml 
   */
    let person = {
      userName: this.recordCompanies.list[this.recordCompanies.index].Value,
      personNo: this.userInfo.GetPersonNo(),
      propertyRightNum: this.open.value,
      companyId: this.recordCompanies.list[this.recordCompanies.index].Key,
    }
    this.queryProvider.getPersonArchivalQuery(person).subscribe(data => {
      if (data.StateCode === 1) {
        this.commonHelper.presentToast(data.Message)
      } else {
        this.commonHelper.presentToast(data.Message)
      }
    });
  }


  /**
   * 机构查询  公开挡备案企业 
   * @param index 0： 名下档 QueryPower 1： 查验 SearchPower 2： 公开档 PublicQuery  
   * @param then 成功回调的方法
   */

  getCompanies(index: number, then: Function) {
    this.companiesJson.queryIndex = index;
    this.queryProvider.getCompanies(this.companiesJson).subscribe(data => {
      if (data.StateCode === 1) {
        then(data);
      } else {
        this.commonHelper.presentToast(data.Message)
      }
    })
  }

  /**
   * 机构查档 个人档备案企业
  */
  getPersonal(index: number, thengen: Function) {
    this.companiesPersonal.queryIndex = index;
    this.queryProvider.getCompanies(this.companiesPersonal).subscribe(data => {
      if (data.StateCode == 1) {
        thengen(data);
      } else {
        this.commonHelper.presentToast(data.Message);
      }
    });
  }

  /**
   * 点击机构查档->个人公开档  查询公开档按钮
  */
  individualPublic() {
    /**
     * 查询本人所需要的参数  PropertyRightNum必须是为'' 因为查询本人和公开档查询用的接口是同一个
     */
    let personJson = {
      propertyRightNum: '',
      userName: this.infoForm.value.data[0].userName,
      personNo: this.infoForm.value.data[0].personNo,
      companyId: this.recordPersona.list[this.recordPersona.index].Key,
    };
    this.infoForm.value.data[0].arr.forEach(data => {
      if (data.name != "") {
        personJson.userName += "," + data.name;
        personJson.personNo += "," + this.infoForm.value.data[0].personNo;
      }
    });

    this.queryProvider.getPersonArchivalQuery(personJson).subscribe(data => {
      if (data.StateCode == 1) {
        this.commonHelper.presentToast("查询成功");
      } else {
        this.commonHelper.presentToast(data.Message);
      }
    })
  }
}
