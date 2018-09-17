import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlManagement } from '../../infrastructure/api-url-management';
import { Observable } from 'rxjs/Rx';
import { ApiResult } from '../../interfaces/api-result';
/**
 * 我的授权相关的服务方法
 */
@Injectable()
export class AuthenticationProvider {

  constructor(public http: HttpClient) {
    HttpParams
  } 

 
  /** 
   * 我的授权列表  
   * @param AuthorizationItem 授权列表的参数
   */
  getAuthorizationList(AuthorizationItem:AuthorizationItem):Observable<ApiResult<{}>>{
    return this.http.get(ApiUrlManagement.getAuthorizationList,{params: <{}>AuthorizationItem}) 
  }
 
  /**
   * 我的授权列表 详情
   * @param BusinessiInfoItem  授权列表详情的参数
   */
  getBusinessiInfo(BusinessiInfoItem:BusinessiInfoItem):Observable<ApiResult<{}>>{
    return this.http.get(ApiUrlManagement.getBusinessiInfo,{params: <{}>BusinessiInfoItem}) 
  }

}
/**
 * 我的授权列表参数
 */
export interface AuthorizationItem{
    type:string
}

/**
 * 我的授权列表详情 参数
 */
export interface BusinessiInfoItem{
  mongoId:string,
  typeCode:string, 
} 

