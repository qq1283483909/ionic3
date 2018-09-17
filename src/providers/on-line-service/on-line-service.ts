import { ApiUrlManagement } from './../../infrastructure/api-url-management';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiResult } from '../../interfaces/api-result';
/*
  Generated class for the OnLineServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OnLineServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello OnLineServiceProvider Provider');
  }

  /**
   * 
   * @param typeCode 根据业务编号请求
   */
  getOnlinePullMenuDate(typeCode:string):Observable<ApiResult<{}>> {

    return this.http.get(ApiUrlManagement.GetonlinePullMenuDate,{params:{
      typecode:typeCode,
    }})
  }

  /**
   * 获取下拉的类型
   */
  getPnlinePullListType(typeCode:string):Observable<ApiResult<{}>> {
    
    return this.http.get(ApiUrlManagement.GetOnlinePullListType,{params:{
      typecode:typeCode,
    }});
  }

  /**
   * 在线办理
   */
  OnlineWork(houseno:string,houseowner:string,typecode:string,companyId:string = ''):Observable<ApiResult<{}>> {

    if (companyId == ''){
      return this.http.post(ApiUrlManagement.OnlineWorkApi,{},{params:{
        houseno:houseno,
        houseowner:houseowner,
        typecode:typecode,
      }});
    }
    
    else {
      return this.http.post(ApiUrlManagement.OnlineWorkApi,{},{params:{
        houseno:houseno,
        houseowner:houseowner,
        typecode:typecode,
        companyId:companyId,
      }});
    }

    
  }
}

   

export interface MenuModel {

  /**
   * id值
   */
  Key:string,

   /**
    * 显示的值
    */
  Value:string,
}

export interface bankInfoModel {
  /**
   * 地址
   */
  Address:string;

  /**
   *创建时间 
   */
  CreateTime:string;

  /**
   * Id
  */
  Id: string;

  /**
   * 权利人名称
   */
  Name:string;

  /**
   * 权利人编号代码
   */
  Number:string;

  /**
   * 类型
   */
  NumberType:string;

  /**
   * 手机号
   */
  Phone:string

  /**
   * 类型
   */
  Type:string;

}