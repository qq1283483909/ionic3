import { ForgetpasswordPageModule } from './../../pages/forgetpassword/forgetpassword.module';

import { Observable, operators } from 'rxjs/Rx';
import { ApiUrlManagement } from './../../infrastructure/api-url-management';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResult } from '../../interfaces/api-result';


/*
  账号相关的服务方法
*/
@Injectable()
export class AccountProvider {

  constructor(public http: HttpClient) { }

  /**
   * 注册服务方法
   * @param registerModel 注册参数
   */
  register(registerModel: registerModel): Observable<ApiResult<{}>> {


    return this.http.post(ApiUrlManagement.register, {}, { params: <{}>registerModel });

  }
  /**
   * 获取验证码方法
   * @param codeModel 获取验证码参数
   */
  getCode(codeModel: codeModel): Observable<ApiResult<{}>> {

    return this.http.post(ApiUrlManagement.code, {}, { params: <{}>codeModel })

  }


  /**
   * 登录方法
   * @param loginModel 登录参数
   */
  login(loginModel: IloginModel): Observable<ApiResult<{}>> {
    loginModel.grant_type = 'password';

    return this.http.post(ApiUrlManagement.login, loginModel);
    //{UserName: '17776685392', password: '111111', grant_type: 'password'}
  }

  /**
   * 业务进度查询提交方法
   * @param progressqueryModel 登录参数
   */

  progressquery(progressqueryModel: pprogressqueryModel): Observable<ApiResult<{}>> {

    return this.http.get(ApiUrlManagement.progressquery, { params: <{}>progressqueryModel })
  }

  /**
 * 修改密码服务方法
 * @param forgetpasswordModel 注册参数
 */
  forgetpassword(forgetpasswordModel: forgetpasswordPageModule): Observable<ApiResult<{}>> {

    

    return this.http.post(ApiUrlManagement.forgetpassword, forgetpasswordModel);

  }


  /**
   * 获取修改密码验证码方法
   * @param codeModell 获取验证码参数
   */
  getCodee(codeModell: codeModell): Observable<ApiResult<{}>> {

    return this.http.post(ApiUrlManagement.codee, {}, { params: <{}>codeModell })

  }


}

export interface codeModel {
  /**
   * 手机号
   */
  phone: string;
  /**
   * 是否为注册
   */
  isRegister: string

}

export interface codeModell {
  /**
   * 手机号
   */
  phone: string;
}

export interface IloginModel {
  /**
   * 手机号
   */
  username: string;
  /**
   * 密码
   */
  password: string;
  grant_type: string;
}

export interface pprogressqueryModel {
  /**
   * 业务受理号
   */
  key: string;
  /**
   * 密码
   */
  personnumber: string;
}


export interface registerModel {
  /**
   * 姓名
   */
  userName: string,
  /**
   * 身份证
   */
  personNo: string,
  /**
   * 手机号
   */
  phoneNumber: string,
  /**
   * 密码
   */
  password: string,
  /**
   * 确认密码
   */
  confirmPassword: string,
  /**
   * 验证码
   */
  validCode: string

}


export interface forgetpasswordPageModule {
  /**
   * 手机号
   */
  Mobile: string,
  /**
   * 密码
   */
  Password: string,
  /**
 * 确认密码
 */
  ConfirmPassword: string,
  /**
    * 验证码
    */
  Code: string

   
  grant_type: string;
}
