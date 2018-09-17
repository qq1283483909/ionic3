import { MenuModel } from './../../providers/on-line-service/on-line-service';
import { CommonHelper } from './../../models/commonHelper';
import { typeInfos } from './../../infrastructure/typeInfoHelper';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { listContentModule } from '../../providers/typelist/typelist';
import { OnLineServiceProvider } from '../../providers/on-line-service/on-line-service';
import { Menu } from '../../../node_modules/ionic-angular/umd/components/app/menu-interface';

/**
 * Generated class for the PersonalfileOpenfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/**
 * 信息校验
 */
@IonicPage()
@Component({
  selector: 'page-personalfile-openfile',
  templateUrl: 'personalfile-openfile.html',
})
export class PersonalfileOpenfilePage implements OnInit {

 /**
  * 在线办理-种类-名字
  */
  ProjectName: string;

  /**
   * 表单
   */
  onlineForm: FormGroup;

  /**
   * 
   */
  username: string;

  /**
   * 传进来的item,listContentModule类型
   */
  type: listContentModule;

  /**
   * 如果有证书类型的时候选择的整数类型
   */
  selectCerType:string = '';

  /**
   * 邕房预字第多少号
   */
  inputNumber:number;

  /**
   * 备案企业标签或者是预告人证件号
   */
  pullListLabel:string = '';

  /**
   * 是否显示权利人的对象标识
   */
  IsShowQuanliren:any = null;

  /**
   * 标题
   */
  title:string = '';

  list: object[] = [];

  state: any;

  states: any[] = [];

  /**
   * 银行下拉数据或者证件号下拉数据
   */
  PullList: MenuModel[] = [];

  /**
   * 银行下拉菜单绑定的值
   */
  selectValue:any;

  ngOnInit(): void {
    this.CreateForm();
  }

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public modalCtrl: ModalController,
      public fb: FormBuilder,
      public OnlineProvide:OnLineServiceProvider,
      public helper:CommonHelper) {

    this.type = this.navParams.get('Items');
    console.log('数据' + JSON.stringify(this.type));
    this.ProjectName = this.type.ProjectName;
  }


  CreateForm() {
    this.showList();

    /**
     * 下拉框默认的字符串
     */
    let defultStr = this.states.length > 0 ? this.states[0]['Name'] : '';

    this.onlineForm = this.fb.group({
      username: ['桂2015不动产权证1234567号'],
      state: [defultStr, [Validators.required]],
      selectValue:['',[Validators.required]],

    });
  }

  ionViewDidLoad() {

    this.OnlineProvide.getOnlinePullMenuDate(this.type.TypeCode).subscribe( res => {

      if (res.StateCode == 1){
  
        this.PullList = <MenuModel[]>JSON.parse(JSON.stringify(res.Data));
  
        console.log('下拉数据为' + this.PullList);
  
      }else{
      
        this.helper.presentToast('网络出错',2000);
      }
      },err => {
  
        this.helper.presentToast('请求失败',2000);
      });
  }


  showList() {

    
    /**
     * 筛选出来的跟点击进来的typeCode一样的对象数组
     */
    this.list = typeInfos.filter(item => item.TypeCode === this.type.TypeCode);

    /**
     * 一般来说，只有一个对象符合
     */
    
    this.list.length > 0 ? this.states = this.list[0]['Certificate'] : this.states = [] ;

    this.pullListLabel = this.list.length > 0 ? this.list[0]['RecordInfo']['Title'] : '';
  
    this.IsShowQuanliren = this.list.length > 0 ? this.list[0]['quanlirenInfo'] : null ;

    this.selectCerType = this.states.length > 0 ? this.states[0]['Name'] : '';

    this.title = this.list.length > 0 ? this.list[0]['title'] : '';

  }

  /**
   * 
   * @param event 邕e登第几号绑定的值
   */
  onChange(event:any) {
    console.log('输出' + event);
  }
  
  /**
   * 
   */
  nextStep() {
    console.log('输出' + JSON.stringify(this.onlineForm.value));
  }
}
