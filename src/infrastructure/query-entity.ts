import { UserInfo } from './user-info';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from "@angular/forms";
import { RegularExpression, forRegExpValidator } from './regular-expression';
import { Injectable } from '@angular/core';

@Injectable()
export class QueryEntity {

  constructor(private fb: FormBuilder, private userInfo: UserInfo) {

  }


  /**
   * 创建个人档的from
   * @param form 返回from 表单
   * @param index  用来判断是否注册值进去
   */
  CreateInfoForm(form: FormGroup,index:number = 0) {
    return this.fb.group({
      data: this.fb.array([this.createFormData(index)])
    });
  }

  /**
   * 创建个人档列表
   * @param index 用来判断是否注册值进去
   */
  createFormData(index:number) {
    let userName = index ==0?this.userInfo.GetPersonName():'';
    let personNo = index ==0?this.userInfo.GetPersonNo():'';
    return this.fb.group({
      personNo: [personNo, [Validators.required, forRegExpValidator(RegularExpression.matchIDCard, 'personNo')]],
      userName: [userName, [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
      arr: this.fb.array([this.createFormName()]), // formarray
    });
  }

  /**
   * 创建家庭档的model
   * @param form 返回from 表单
   * @param index  用来判断是否注册值进去
   */
  CreateFamilyForm(form: FormGroup,index:number = 0) {
    return this.fb.group({
      data: this.fb.array([this.createFormFamilyData(index)])
    });
  }

  /**
   * 创建家庭档的列表
   * @param index 用来判断是否注册值进去
   */
  createFormFamilyData(index:number) {
    let userName = index ==0?this.userInfo.GetPersonName():'';
    let personNo = index ==0?this.userInfo.GetPersonNo():'';
    return this.fb.group({
      personNo: [userName, [Validators.required, forRegExpValidator(RegularExpression.matchIDCard, 'personNo')]],
      userName: [personNo, [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
      arr: this.fb.array([this.createFormName()]), // formarray
      auth: false,
    });
  }

  /**
   * 曾用名的列表
   */
  createFormName() {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
      isAdd: false,
    });
  }

}