import { checkrecordsItem } from './checkserve';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiUrlManagement } from './../../infrastructure/api-url-management';
import { ApiResult } from '../../interfaces/api-result';

/*
  Generated class for the CheckserveProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CheckserveProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CheckserveProvider Provider');
  }

   /**
   * 二维码扫描后调用的接口
   * @param newsid  扫描出的code
   * 
   */
  getHtmlContent(code:string):Observable<htmlContentItem> {

    return this.http.get<htmlContentItem>(ApiUrlManagement.qrscancheckservice,{params:{
      Id:code
    }});
  }

  /**
   * 获取查验记录
   */
  getcheckrecordes(page:number):Observable<ApiResult<{}>>{

    return this.http.post(ApiUrlManagement.checkrecordes, {
      params: {
        page: page.toString(),
        pageSize:'10'
      }});
}
}

export interface htmlContentItem{
  "StateCode": string,
  "Message":string,
  "Data": string
}


/**
 * 查档记录model
 */
export interface checkrecordsItem{
  "Id":string,
  /**
   * 二维码扫出来的字符串
   */
  "IdentityCode":string,
  /**
   * 时间
   */
  "CreateDateTime":string,
  /**
   * 是否是线上
   */
  "Message":string,
  /**
   * html内容
   */
  "HtmlContent":string
}