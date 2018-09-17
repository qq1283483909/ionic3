import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlManagement } from '../../infrastructure/api-url-management';
import { Observable } from 'rxjs/Rx';
import { ApiResult } from '../../interfaces/api-result';
/**
 * 查档相关的服务方法
 */
@Injectable()
export class QueryProvider {

  constructor(public http: HttpClient) {
    HttpParams
  }

  /**
   * 个人档->公开档查询
   * @param PersonUploadItem 公开档查询的参数
   */ 
  getOpenQuery(PersonUploadItem:PersonUploadItem): Observable<ApiResult<{}>> {
    return this.http.post(ApiUrlManagement.PersonUploadSave,PersonUploadItem);
  }

  /**
   * 个人档->查询个人 
   * @param PersonUploadItem 查询个人的参数
   */
  getPersonUploadSave(PersonUploadItem:PersonUploadItem): Observable<ApiResult<{}>> {
    return this.http.post(ApiUrlManagement.PersonUploadSave,PersonUploadItem);
  }


  /**
   * 个人档->查询家庭成员 
   * @param PersonUploadItem 查询家庭成员的参数
   */
  getFamilyUploadSave(FamilyUploadItem:FamilyUploadItem): Observable<ApiResult<{}>> {
    return this.http.post(ApiUrlManagement.FamilyUploadSave,FamilyUploadItem );
  }

  /**
   * 个人档->查询公开档记录  
   * @param LisItem 查询公开档记录的参数
   */
  getOpenArchivalList(LisItem:LisItem): Observable<ApiResult<{}>> {
    return this.http.get(ApiUrlManagement.getOpenArchivalList, { params:  <{}>LisItem });
  }

  /**
    * 个人档->查询名下档和家庭档记录
    * @param LisItem 查询公开档记录的参数   
    */
  getPersonArchivalList(PersonOrganizItem:PersonOrganizItem): Observable<ApiResult<{}>> {
    return this.http.get(ApiUrlManagement.getPersonArchivalList, { params:  <{}>PersonOrganizItem });
  }

  /**
   * 机构查档->备案企业列表
   * @param queryIndex 0： 名下档 QueryPower 1： 查验 SearchPower 2： 公开档 PublicQuery   
  */
 getCompanies(PublicBlock):Observable<ApiResult<{}>>{
    return this.http.get(ApiUrlManagement.getCompanies,{params: <{}>PublicBlock})
    // return ;
  }

  /**
   * 机构查档->个人档和名下档查询
   * @param personArchivalQueryItem 个人档和名下档查询的参数
   */
  getPersonArchivalQuery(personArchivalQueryItem:personArchivalQueryItem): Observable<ApiResult<{}>> {
    return this.http.post(ApiUrlManagement.PersonArchivalQuery,personArchivalQueryItem );
  }

  /**
   * 机构查档->个人档的记录
   */
  getPersonOrganization(PersonOrganizItem:PersonOrganizItem):Observable<ApiResult<{}>>{
    return this.http.get(ApiUrlManagement.getPersonOrganization,{params: <{}>PersonOrganizItem}) 
  }


} 

/**
 * 机构查档->个人档记录的Model
 */
export interface PersonOrganizItem {
  /**
   * 页数
   */
  page: number,
  /**
   * 数量
   */
  pagesize: number,  
} 

/**
 * 
 */
export interface personArchivalQueryItem{ 
  /**
   * 企业name
   */
  userName:string,

  /**
   * 身份证号码
   */
  personNo: string,
  /**
   * 档案
   */
  propertyRightNum: string,
  /**
   * 	企业id
   */
  companyId:string 
}

/**
 * 机构查档备案企业列表的Model 
 * 0： 名下档 QueryPower 1： 查验 SearchPower 2： 公开档 PublicQuery   
 */
export interface companiesItem{
  queryIndex:number;
}

/**
 * 个人查档->查档的Model
 */
export interface PersonUploadItem {
  /**
   * 查询本人所需要的参数  PropertyRightNum必须是为'' 因为查询本人和公开档查询用的接口是同一个
   */
  PropertyRightNum: string,
  /**
   * 用户姓名
   */
  personName: string,
  /**
   * 用户身份证
   */
  personNo: string,
}


/**
 * 个人查档->家庭档的Model
 */ 
export interface FamilyUploadItem { 
  [index:number]:string;
  // values: [
  //   {
  //     Key:string,
  //     Value: string
  //   }
  // ]
}

/**
 * 个人查档->查档记录的Model
 */
export interface LisItem {
  /**
   * 页数
   */
  page: number,
  /**
   * 数量
   */
  pagesize: number,
  /**
   * false是个人档  true是机构档
   */
  isOrganization: boolean, 
} 
/**
 * 机构查档 备案企业
 */
export interface PublicBlock{
  /**
 * 机构查档 备案企业的参数
 */
  queryIndex: ''
}