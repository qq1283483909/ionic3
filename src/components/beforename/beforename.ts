import { QueryEntity } from './../../infrastructure/query-entity';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from "@angular/forms";
import { RegularExpression, forRegExpValidator, } from '../../infrastructure/regular-expression';
import { CommonHelper } from './../../models/commonHelper';
import { AlertController } from 'ionic-angular';
/**
 * 曾用名的demol 
 */
@Component({
  selector: 'beforename',
  templateUrl: 'beforename.html'
})
export class BeforenameComponent {
  /**
     * 从组件上获取的对象
     */
  @Input() formData: any;
  @Input() formErrors: any;

  /**
   * 判断是机构查档还是个人查档
   * 0是个人查档    1是机构查档
   */
  @Input() query: number;

  /**
   * 判断是否是家庭档
   */
  @Input() queryFamily: number;
  constructor(private fb: FormBuilder, private queryEntity: QueryEntity, private commonHelper: CommonHelper, private alertCtrl: AlertController, ) {
     
  }

  /**
   * 曾用名的列表
   */
  private createForm2() {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
      isAdd: false,
    });
  }

  /**
   * 添加曾用名
   * @param i 从页面返回的1级索引
   * @param a 从页面返回的2级索引
   */
  newForm(i: number, a: number) {
    const data = this.formData.get('data') as FormArray;
    const arr = data.controls[i].get('arr') as FormArray;
    if (arr.value[a].name != '') {
      arr.value[a].isAdd = true;
      arr.push(this.queryEntity.createFormName())
    } else {
      this.commonHelper.presentToast("请输入您的曾用名");
    }
  }

  /**
   * 删除曾用名
   * @param i 从页面返回的1级索引
   * @param a 从页面返回的2级索引
   */
  removeForm(i: number, a: number) {
    const data = this.formData.get('data') as FormArray;
    const arr = data.controls[i].get('arr') as FormArray;
    arr.length == 1 ? '' : arr.removeAt(a) // 根据索引移除对应的表单
  }


  /**
   * 认证家庭成员
   * @param i 从页面返回的1级索引
   */
  familyPersonalQuery(i: number) {
    const data = this.formData.get('data') as FormArray;
    // this.authActionSheet.actionSheet(this.FamilyList[firstIndex].personName, this.FamilyList[firstIndex].personNo, this.user.userName).subscribe(value => {
    data.value[i].auth = true
    // });
  }

  /**
   * 添加家庭成员
   */
  addFamily() {
    let alert = this.alertCtrl.create({
      title: '添加家庭成员',
      subTitle: '请输入姓名身份证号码',
      inputs: [
        {
          name: 'personName',
          placeholder: '姓名',

        },
        {
          name: 'personNo',
          placeholder: '身份证号码'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {

          }
        },
        {
          text: '添加',
          handler: data => {
            if (data.personNo == "") {
              return;
            }
            if (!RegularExpression.matchIDCard.test(data.personNo) && data.personNo != "") {
              this.commonHelper.presentToast('身份证不匹配');
              return;
            } else {
              const dataBody = this.formData.get('data') as FormArray;
              const newForm = this.queryEntity.createFormFamilyData(1);
              newForm.patchValue({
                personNo: data.personNo,
                userName: data.personName
              })
              dataBody.push(newForm);
            }
          }
        }
      ]
    });
    alert.present();
  }

  /**
    * 删除家庭成员
    *@param i 从页面返回的1级索引
    */
  deleteFamilyPersonal(i: number) {
    const data = this.formData.get('data') as FormArray;
    data.length == 1 ? '' : data.removeAt(i) // 根据索引移除对应的表单
  }
}
