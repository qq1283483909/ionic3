import { Loading } from 'ionic-angular';
import { ProtocolModelPage } from './../protocol-model/protocol-model';
import { ProgressQueryPage } from './../progress-query/progress-query';

import { Component, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, ModalController, MenuController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { equalValidetor, RegularExpression, forRegExpValidator, } from '../../infrastructure/regular-expression';
import { AccountProvider, registerModel } from './../../providers/account/account';
import { CommonHelper } from '../../models/commonHelper';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {

  formErrors = {                        // 错误信息
    phoneNumber: '',
    validCode: '',
    userName: '',
    personNo: '',
    password: '',
    confirmPassword: '',
    ischeck: ''

  };
  validationMessages = {              // 错误信息模板
    phoneNumber: {
      required: '手机号不能为空',
      ForRegExpValidator: '手机格式不正确',
      maxlength: '手机号只能11位'
    },
    ischeck: {
      required: '请同意协议',
    },
    validCode: {
      required: '验证码不能为空',
    },
    userName: {
      required: '用户名不能为空',
      minlength: '用户名不能小于2个字符',
      maxlength: '用户名不能大于12个字符'
    },
    personNo: {
      required: '身份证号不能为空',
      ForRegExpValidator: '身份证号为18个字符'
    },
    password: {
      required: '密码不能为空',
      minlength: '密码不能小于6个字符'
    },
    confirmPassword: {
      required: '密码不能为空',
      minlength: '密码不能小于6个字符'
    },
  };

  RegisterForm: FormGroup;
  phoneNumberCtrl: any;




  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private accountPro: AccountProvider,
    private commonHelper: CommonHelper,
    public modalCtrl: ModalController,
  ) {
    this.RegisterForm = formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
      phoneNumber: ['', [Validators.required, forRegExpValidator(RegularExpression.matchPhone, 'phoneNumber'), Validators.maxLength(11)]],
      personNo: ['', [Validators.required, forRegExpValidator(RegularExpression.matchIDCard, 'personNo')]],
      validCode: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      ischeck: [false, Validators.requiredTrue]
    })
    this.RegisterForm.valueChanges.subscribe(data =>
      this.commonHelper.onInputValueChanged(this.RegisterForm, this.formErrors, this.validationMessages)
    );
    this.commonHelper.onInputValueChanged(this.RegisterForm, this.formErrors, this.validationMessages);

    this.phoneNumberCtrl = this.RegisterForm.controls['phoneNumber'];
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss(){
   

  }
  /**
   * 返回登录页
   */
  gotoLogin(){
    this.navCtrl.pop();
  }
  /**
   *  验证码倒计时
   */

  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,
    disable: true
  }

  /**
   * 获取验证码
   */
  getCode() {
    const form = this.RegisterForm;
    const control = form.get('phoneNumber');
    if (control && control.dirty && control.valid) {
      control.value;
      this.accountPro.getCode(
        <any>
        {
          phone: control.value,
          isRegister: true
        }).subscribe(data => {
         // console.log(data);
          this.settime();


        })
    }





  }
  /**
   * 获取验证码倒计时
   */
  settime() {
    if (this.verifyCode.countdown == 0) {
      this.verifyCode.verifyCodeTips = "获取验证码";
      this.verifyCode.disable = true;
      return;
    } else {
      this.verifyCode.countdown--;
      this.verifyCode.disable = false;
    }
    setTimeout(() => {
      this.verifyCode.verifyCodeTips = "重新获取" + this.verifyCode.countdown + "秒";
      this.settime();
    }, 1000);
  }


  /**
   * 同意协议
   */

  getProtocol() {
    const form = this.RegisterForm;
    const control = form.get('ischeck');
    if (control && control.dirty && control.valid) {
      if (control.value) {
      
        let modal = this.modalCtrl.create(ProtocolModelPage);
        modal.present();
        
      }
    }


  }




  /**
   * 注册提交方法
   */

  onRegister() {

    if (this.RegisterForm.valid) {

      this.accountPro.register(this.RegisterForm.value).subscribe(data => {

        if(data.StateCode == 1){
        


        }else{

        }



      }, error => this.formErrors = <any>error);


    }







  }





}
