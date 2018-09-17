import { UserInfo } from './../../infrastructure/user-info';
import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import {equalValidetor, forRegExpValidator, RegularExpression,} from '../../infrastructure/regular-expression';
import { AccountProvider, forgetpasswordPageModule } from './../../providers/account/account';
import { RegisterPage } from '../register/register';
import { CommonHelper } from '../../models/commonHelper';

/**
 * Generated class for the ForgetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgetpassword',
  templateUrl: 'forgetpassword.html',
})
export class ForgetpasswordPage {
  registerPage = RegisterPage;
  formErrors = {                        // 错误信息
    Mobile: '',
    Code : '',
    Password : '',
    ConfirmPassword : ''  

  };
  validationMessages = {              // 错误信息模板
    Mobile: {
      required: '手机号不能为空',
      ForRegExpValidator: '手机格式不正确'
    },
    Code : {
      required: '验证码不能为空',
    },
    Password : {
      required: '密码不能为空',
      minlength: '密码不能小于6个字符'
    },
    ConfirmPassword : {
      required: '密码不能为空',
      minlength: '密码不能小于6个字符'
    },
  };

  Forgetpassword: FormGroup;
  MobileCtrl : any; 
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private accountPro: AccountProvider,
    private commonHelper: CommonHelper,
  ) {
    this.Forgetpassword = formBuilder.group({
      Mobile:   ['', [Validators.required, forRegExpValidator(RegularExpression.matchPhone,'Mobile'), Validators.maxLength(11)]],
      Code :     ['', [Validators.required]],
      Password : ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword : ['', [Validators.required, Validators.minLength(6)]]
      
    })

    this.Forgetpassword.valueChanges.subscribe(data =>
      this.commonHelper.onInputValueChanged(this.Forgetpassword, this.formErrors, this.validationMessages)
    );
    this.commonHelper.onInputValueChanged(this.Forgetpassword, this.formErrors, this.validationMessages);

    this.MobileCtrl =this.Forgetpassword.controls['Mobile'];
  }

  


  /**
 *  验证码倒计时
 */

verifyCode: any = {
  verifyCodeTips: "获取验证码",
  countdown: 120,
  disable: true
}


/**
 * 获取验证码
 */
getCodee(){
  const form = this.Forgetpassword;
  const control = form.get('Mobile');
  if(control && control.dirty && control.valid){
    control.value;
    this.accountPro.getCodee(
      <any>
      {
        phone: control.value,
    }).subscribe(data=>{
      console.log(data);
      this.settime();

        
      })
  }




}


/**
 * 倒计时
 */
settime() {
  if (this.verifyCode.countdown == 0) {
      debugger
      this.verifyCode.verifyCodeTips = "获取验证码";
      this.verifyCode.disable = true;
      return;
  } else {
      this.verifyCode.countdown--;
  }
  setTimeout(() => {
      this.verifyCode.verifyCodeTips = "重新获取" + this.verifyCode.countdown + "秒";
          this.settime();

  }, 1000);
}




/**
 * 修改密码提交方法
 */
  
  onForgetpassword(){

  if(this.Forgetpassword.valid){

    this.accountPro.forgetpassword(this.Forgetpassword.value).subscribe(data=>{ 

      console.log(data);

      

    },error=>this.formErrors = <any>error);

  
  }







}



}
