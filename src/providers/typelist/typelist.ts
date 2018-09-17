// import { typeList } from './typelist';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlManagement } from './../../infrastructure/api-url-management';
import { Observable } from 'rxjs/Rx';
import { ApiResult } from '../../interfaces/api-result';
import "rxjs/add/operator/map";
/*
  业务类型相关服务
*/
@Injectable()
export class TypelistProvider {



  constructor(public http: HttpClient, ) {
    // console.log('Hello TypelistProvider Provider');
  }

  /**
 * 业务类型列表
 */
  getTypeList(): Observable<ApiResult<listDataModule[]>> {
    return this.http.get(ApiUrlManagement.Online);
  }
}
// export interface typeList {
//   /**
//    * 状态码
//    */
//   StateCode : number,

//   /**
//    * 提示信息
//    */
//   Message : string,

//   /**
//    * 数据内容
//    */
//   Data : any,

// }
export interface listDataModule {

  /**
    * 在线&网上
    */
  DType: string;

  /**
    * 业务内容
    */
  DItems: listItemsModule[];
}
export interface listItemsModule {

  /**
    * 业务类型
    */
  Type: string;

  /**
    * 业务类型内容
    */
  Items: listContentModule[];
}
export interface listContentModule {

  /**
    * 业务名
    */
  ProjectName: string;

  /**
    * 业务类型名
    */
  ProjectTag: string;

  /**
    * 房地合一业务
    */
   TypeName: string;
   
   /**
    * boolean
    */
   bActive: boolean;

  /**
    * 业务名(d4-1)
    */
   TypeCode: string;



}