import { Component,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, MaxLengthValidator } from "@angular/forms";
import { equalValidetor, forRegExpValidator, RegularExpression } from '../../infrastructure/regular-expression';
import { AccountProvider,  } from './../../providers/account/account';
import { RegisterPage } from '../register/register';
import { UserInfo } from '../../infrastructure/user-info';
import { CommonHelper } from '../../models/commonHelper';

/**
 * Generated class for the ProgressQueryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-progress-query',
  templateUrl: 'progress-query.html',
})
export class ProgressQueryPage implements OnInit {
  registerPage = RegisterPage;
  pet:string = "个人查档";
  progressqueryForm: FormGroup;
  formErrors = {                        // 错误信息
    key: '',
    personnumber: ''
  };

  validationMessages = {              // 错误信息模板
    key: {
      required: '受理编号号不能为空',
    },
    personnumber: {
      required: '密码不能为空',
      minlength:'密码不能少于4位数',
      maxlength: '密码最多只能15位'
    },

  };

  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public fb: FormBuilder,
     private accountPro: AccountProvider,
     private userInfo: UserInfo,
     private commonHelper: CommonHelper
    ) {
     
  }
  
  ngOnInit() {
    this.CreateForm();
  }

  CreateForm() {
    this.progressqueryForm = this.fb.group({
      key: ['', [Validators.required, Validators.minLength(6)]],
      personnumber: ['', [Validators.required, Validators.minLength(4),  Validators.maxLength(15)]],
    });
    this.progressqueryForm.valueChanges.subscribe(data =>
      this.commonHelper.onInputValueChanged(this.progressqueryForm, this.formErrors, this.validationMessages)

    );
    this.commonHelper.onInputValueChanged(this.progressqueryForm, this.formErrors, this.validationMessages)
  }

    
  
  /**
   * 进度查询提交方法
   */
  onLoginn() {
    if (this.progressqueryForm.valid) {

      this.accountPro.progressquery(this.progressqueryForm.value).subscribe(data => {
        console.log(data)
      }, error => this.formErrors = <any>error);
    }
  }


  myclass (){
    let classes = {    
      "icon-msnui-radio" : this.pet != "个人查档",
      "icon-danxuan_" : this.pet === "个人查档"
    };
    return classes;

  }

  myclass1 (){
    let classes = {
      "icon-msnui-radio" : this.pet === "个人查档",
      "icon-danxuan_" : this.pet != "个人查档"
    };
    return classes;

  }
}
