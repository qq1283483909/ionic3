import { ZhiMaUriPara } from './auth';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlManagement } from '../../infrastructure/api-url-management';
import { Observable } from 'rxjs/Rx';
import { ApiResult } from '../../interfaces/api-result';

/*
  授权认证相关方法
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    HttpParams
  }


  getZhiMaUri(zhimaUriPara: ZhiMaUriPara): Observable<ApiResult<any>>{
    return this.http.get(ApiUrlManagement.zhimaUrl, {params: <{}>zhimaUriPara} );
  }


}
/**
 * 请求芝麻url参数
 */
export interface ZhiMaUriPara{
  apdidToken:string,
  appName:string,
  appVersion:string,
  bioMetaInfo:string,
  deviceModel:string,
  deviceType:string,
  osVersion:string,
  zimVer:string,
  /**
   * 姓名
   */
  certName:string,
  /**
   * 证件号
   */
  certNo:string,
  /**
   * mongoId
   */
  mongoId?:string,
  /**
   * 业务类型
   */
  typeCode?:string
}
