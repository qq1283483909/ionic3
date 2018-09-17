import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, MaxLengthValidator } from "@angular/forms";
import { equalValidetor, forRegExpValidator, RegularExpression } from '../../infrastructure/regular-expression';
import { AccountProvider, IloginModel } from './../../providers/account/account';
import { RegisterPage } from '../register/register';
import { UserInfo } from '../../infrastructure/user-info';
import { CommonHelper } from '../../models/commonHelper';
/**
 * 登录页面ts
 */ 

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  registerPage = RegisterPage;
  loginForm: FormGroup;
  formErrors = {                        // 错误信息
    username: '',
    password: ''
  };
  validationMessages = {              // 错误信息模板
    username: {
      required: '手机号不能为空',
      ForRegExpValidator: '手机号格式不正确',
    },
    password: {
      required: '密码不能为空',
      minlength: '密码不能小于6个字符'
    },

  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    private accountPro: AccountProvider,
    private userInfo: UserInfo,
    private commonHelper: CommonHelper,
    public viewCtr:ViewController,
  ) {
      this.CreateForm();
  }



  CreateForm() {
    this.loginForm = this.fb.group({
      username: ['18812341234', [Validators.required,forRegExpValidator(RegularExpression.matchPhone, 'username')]],
      password: ['111111', [Validators.required, Validators.minLength(6)]],
    });
    this.loginForm.valueChanges.subscribe(data =>
      this.commonHelper.onInputValueChanged(this.loginForm, this.formErrors, this.validationMessages)
    );
    this.commonHelper.onInputValueChanged(this.loginForm, this.formErrors, this.validationMessages)
  }
  /**
   * 表单处理方法
   * @param data 
   */

  /**
   * 登录提交方法
   */
  onLogin() {


    if (this.loginForm.valid) {
      this.accountPro.login(this.loginForm.value).subscribe(data => {
        console.log(data);
        this.userInfo.SetExpires(data['.expires']); 
        this.userInfo.SetPersonName(data['personName']);
        this.userInfo.SetPersonNo(data['personNo']);
        this.userInfo.SetToken(data['access_token']);
        this.userInfo.SetUserName(data['userName']);
        this.userInfo.SaveCompanyAccountInfo(data['isCompanyAccount']);
        this.userInfo.SaveHumanReadName(data['IsHumanReadName']);
        this.userInfo.SaveReadName(data['IsRealName']);
        this.userInfo.SaveUserHeadImageUrl(data['imgUrl']);

        if (JSON.parse(data['bindCompanyNames']).length > 0){

          this.userInfo.SaveBindCompanyName(JSON.parse(data['bindCompanyNames'])[0]);
        }


        let logindata = {login:true};

        this.viewCtr.dismiss(logindata);

      }, error => {
        this.formErrors = <any>error;

        this.commonHelper.presentToast('登录失败',2000);
      }
    );
    }
  }

  /**
   * 如果有关闭按钮
   */
  closeclick() {
  let data = {login:false};
   this.viewCtr.dismiss(data);
  }

}
