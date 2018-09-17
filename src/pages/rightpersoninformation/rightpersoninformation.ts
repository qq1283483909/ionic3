import { bankInfoModel } from './../../providers/on-line-service/on-line-service';
import { Component,NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, ModalController, MenuController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { equalValidetor, RegularExpression, forRegExpValidator, } from '../../infrastructure/regular-expression';
import { CommonHelper } from '../../models/commonHelper';


/**
 * Generated class for the RightpersoninformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rightpersoninformation',
  templateUrl: 'rightpersoninformation.html',
})
export class RightpersoninformationPage {
  
 /**
  * 标题
  */
  title:string;

  /**
   * 权利人信息对象--如果是编辑页面的话会传入对象进来
   */
  quanlirenInfo:bankInfoModel = null;

  bow = [
    {"name":"个人"},
    {"name":"企业"},
    {"name":"事业单位"},
    {"name":"国家机关"},
    {"name":"其他"},
  ];

  documenttype = [
    {"type":"身份证"},
    {"type":"港澳台身份证"},
    {"type":"护照"},
    {"type":"户口簿"},
    {"type":"军官证（士兵证）"},
    {"type":"组织机构代码"},
    {"type":"营业执照"},
    {"type":"统一社会信用代码"},
    {"type":"其他"},
  ];

  gtr = [
     {"All":"单独所有"},
     {"All":"共同共有"},
     {"All":"按份共有"},
  ];



  formErrors = {                        // 错误信息
    Name:'',
    personno:'',
    phonenumber:'',
    communication:''
  };

  open = {
    no:'',
    po:'',
  }

  validationMessages = {              // 错误信息模板
    Name: {
      required: '中文名称不能为空',
      min:"中文名称至少2位数",
      maxlength:"中文名称不能超过6位数"
    },
    personno: {
      minlength: '证件号码不能少于18位数',
      maxlength: '证件号码不能超过18位数'
    },
    phonenumber: {
      minlength: '号码长度为11位，请继续输入',
      maxlength: '号码长度大于11位，请修改'
    },
    communication:{
      required:'通讯地址必填',
    },
    no: {
      
    }

  };

    rightpersonformationForm:FormGroup;


    

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder,
     public menuCtrl: MenuController,
     private commonHelper: CommonHelper,
     public modalCtrl: ModalController,
    ) {
      
      this.title = navParams.get('title');

      this.quanlirenInfo = navParams.get('bankInfoModel');

      this.rightpersonformationForm = formBuilder.group({
         Name:[this.quanlirenInfo.Name,[Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
         personno:[this.quanlirenInfo.Number,[Validators.required,  Validators.minLength(18), Validators.maxLength(18), forRegExpValidator(RegularExpression.matchIDCard, 'personno')]],
         phonenumber: [this.quanlirenInfo.Phone, [Validators.required, forRegExpValidator(RegularExpression.matchPhone, 'phoneumber'),Validators.minLength(11), Validators.maxLength(11)]],
         communication:[this.quanlirenInfo.Address,[Validators.required, ]],
      });
      this.rightpersonformationForm.valueChanges.subscribe(data =>
        this.commonHelper.onInputValueChanged(this.rightpersonformationForm, this.formErrors, this.validationMessages)
      );
      this.commonHelper.onInputValueChanged(this.rightpersonformationForm, this.formErrors, this.validationMessages)
  }

  ionViewDidLoad() {
          
  }

}
