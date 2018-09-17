import { QueryEntity } from './../../infrastructure/query-entity';
import { CurrencyString, QueryString } from './../../infrastructure/currency-string';
import { AuthActionSheet } from './../../models/AuthActionSheet';
import { QueryhistorPage } from './../queryhistor/queryhistor';
import { UserInfo } from './../../infrastructure/user-info';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController, AlertController } from 'ionic-angular';
import { CommonHelper } from "../../models/commonHelper";
import { QueryProvider } from './../../providers/query/query';

import { FormGroup } from "@angular/forms";


/**
 * 个人查档页面
 */
@IonicPage()
@Component({
  selector: 'page-queryinformation',
  templateUrl: 'queryinformation.html',
})
export class QueryinformationPage {
  /**
   * 个人档的form
   */
  infoForm: FormGroup;

  /**
   * 家庭档的form
   */
  familyForm: FormGroup;

  constructor(public navCtrl: NavController, private queryEntity: QueryEntity, public queryProvider: QueryProvider, public navParams: NavParams, public userInfo: UserInfo, public authActionSheet: AuthActionSheet, public modalCtrl: ModalController, public alertCtrl: AlertController, public commonHelper: CommonHelper) {
    this.infoForm = this.queryEntity.CreateInfoForm(this.infoForm);
    this.familyForm = this.queryEntity.CreateFamilyForm(this.familyForm);
 
  }

  /**
   * 初始化字符串
   */
  initString = {
    /**
     * * 个人查档 tabs 的name
  */
    pet: QueryString.queryinformationPet,

    /**
   * 2级tabs的name 
   */
    tabs: QueryString.queryinformationTabs,

    tabA: [
      { name: CurrencyString.gkdcxName },
      { name: CurrencyString.mxdcxName }
    ],
    tabB: [
      { name: CurrencyString.bdcqzName },
      { name: CurrencyString.yfqzName },
      { name: CurrencyString.qtName },
    ],
    gkdcxName: CurrencyString.gkdcxName,
    mxdcxName: CurrencyString.mxdcxName,
    bdcqzName: CurrencyString.bdcqzName,
    yfqzName: CurrencyString.yfqzName,
    qtName: CurrencyString.qtName,

    cxgkdName: CurrencyString.cxgkdName,
    cxbrName: CurrencyString.cxbrName,
    cxjtcyName: CurrencyString.cxjtcyName,
    cdjlName: CurrencyString.cdjlName,
  }
  user = {
    personName: this.userInfo.GetPersonName(),
    personNo: this.userInfo.GetPersonNo(),
    userName: this.userInfo.GetUserName(),
    token: this.userInfo.GetToken(),
    isReadName: this.userInfo.CheckIsReadName(),
    list: [
      { name: '', isAdd: false },
    ]
  };
  open = {
    type: [
      {
        id: 1,
        name: CurrencyString.nnsbdcqzName
      }, {
        id: 2,
        name: CurrencyString.nnsbdczmName
      },
    ],
    typeTxt: CurrencyString.nnsbdcqzName,
    no: '',
    noo: '',
    YTypes: [
      {
        id: 1,
        name: CurrencyString.yfqzzName,
        limit: 7,
      }, {
        id: 2,
        name: CurrencyString.yfyzName,
        limit: 8
      },
    ],
    YTypeTxt: CurrencyString.yfqzzName,
    Yno: '',
    code: '',
    value: '',
  };
  /**
   *  曾用名的数量 
   */
  beforeNameLength: number = QueryString.beforeNameLength;

  ionViewDidLoad() {
    // this.infoForm.value.data[0].personNo = this.userInfo.GetPersonNo();
  }

  /**
   * 点击头部切换
   */
  petChanged() {
    QueryString.queryinformationPet = this.initString.pet;
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
    let profileModal = this.modalCtrl.create(QueryhistorPage, { index: 0, tabsName: this.initString.pet, tabsArray: this.initString.tabA, });
    profileModal.present();
  }


  /**
   * 查询本人
   */
  perSonQuery() {

    /**
     * 查询本人所需要的参数  PropertyRightNum必须是为'' 因为查询本人和公开档查询用的接口是同一个
     */
    let personJson = {
      PropertyRightNum: '',
      personName: this.user.personName,
      personNo: this.user.personNo,
    };

    this.infoForm.value.data[0].arr.forEach(data => {
      if (data.name != "") {
        personJson.personName += "," + data.name;
        personJson.personNo += "," + this.user.personNo;
      }
    });
    // this.authActionSheet.actionSheet(this.user.personName, this.user.personNo, this.user.userName).subscribe(value => {
    this.queryProvider.getPersonUploadSave(personJson).subscribe(data => {
      if (data.StateCode === 1) {
        this.commonHelper.presentToast(data.Message)
      } else {
        this.commonHelper.presentToast(data.Message)
      }
    })
    // }); 
  }


  /**
   * 查询家庭成员
   */
  familyQuery() {

    const json = {
      values: []
    }
    const data = this.familyForm.value.data;

    for (const index in data) {
      json.values.push({ Key: data[index].userName, Value: data[index].personNo });
      for (const item in data[index].arr) {
        if (data[index].arr[item].name != "") {
          json.values[index].Key += "," + data[index].arr[item].name;
          json.values[index].Value += "," + data[index].personNo;
        }
      }
    }
    this.authActionSheet.actionSheet(this.user.personName, this.user.personNo, this.user.userName).subscribe(value => {
      this.queryProvider.getFamilyUploadSave(json).subscribe(data => {
        if (data.StateCode === 1) {
          this.commonHelper.presentToast(data.Message)
        } else {
          this.commonHelper.presentToast(data.Message)
        }
      })
    });
  }


  /**
   * 查询公开档
   */
  openQuery() {
    if (this.open.value == '') {
      this.commonHelper.presentToast("您输入的权证信息有误，请重新输入！");
      return false;
    }
    /**
     * 查询本人所需要的参数  PropertyRightNum必须是为'' 因为查询本人和公开档查询用的接口是同一个
     */
    let OpenJson = {
      PropertyRightNum: this.open.value,
      personName: this.user.personName,
      personNo: this.user.personNo,
    };
    this.authActionSheet.actionSheet(this.user.personName, this.user.personNo, this.user.userName).subscribe(value => {
      this.queryProvider.getOpenQuery(OpenJson).subscribe(data => {
        if (data.StateCode === 1) {
          this.commonHelper.presentToast(data.Message)
        } else {
          this.commonHelper.presentToast(data.Message)
        }
      })
    });
  }
}
