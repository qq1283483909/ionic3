import { ApiUrlManagement } from './../../infrastructure/api-url-management';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResult } from '../../interfaces/api-result';

/*
  Generated class for the MybusinessProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MybusinessProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MybusinessProvider Provider');
  }

  /**
   * 根据页数获取我的业务列表
   * @param page 
   */
  getMyBusinessLoist(page: number = 1): Observable<ApiResult<{}>> {

    return this.http.get(ApiUrlManagement.getMyBusinessList, {
      params: {
        page: page.toString(),
        pagesiz: '10',
      }
    })
  }

  /**
  * 根据点击的业务获取业务详情信息
  * @param id 
  */

  getBusinessPurchase(id: string): Observable<ApiResult<{}>> {
    return this.http.get(ApiUrlManagement.BusinessPurchaseApi, {
      params: {
        id: id
      }
    })
  }



  /**
   * 根据点击的批量业务查看业务详情
   * @param id 
   * @param projecttypeid
   */

  getApplicationInformation(id: string, projecttypeid: string): Observable<ApiResult<{}>> {
    return this.http.get(ApiUrlManagement.ApplicationInformationApi, {
      params: {
        id: id,
        projecttypeid: projecttypeid
      }
    })
  }


  /**
 * 选择加入预约列表
 * @param useid
 */

  getAddappointmentlist(useid: object): Observable<ApiResult<{}>> {
    return this.http.post(ApiUrlManagement.AddappointmentlistApi, {
      params: {
        useid: useid.toString()
      }
    })
  }
}






export interface mybusinessMoedl {
  /**
   * 业务名称
   */
  ProjectName: string,

  /**
   * 创建日期
   */
  CreateDate: string,

  /**
   * 流水号
   */
  AppointmentNo: string,

  /**
   * ID
   */
  Id: string,

  /**
   * 批量业务Children
   */
  Children: businessChildrenModel[],

  /**
   * 是否是批量
   */
  HasChild: boolean;

  /**
   * 是否已关闭
   */
  Closed: boolean;

  /**
   * 是否已完成
   */
  Finished: boolean;

  /**
   * 审核不通过
   */
  UnChecked: boolean;

  /**
   * 是否正在预约
   */
  IsInRsv: boolean;

  /**
   * 已预约
   */
  CanDate: boolean;

  /**
   * Candate为真并且finishDate有值 就是已预约 已预约日期  否则分几种状态
   */
  FinishDate: string;

  /**
   * 是否缴费
   */
  IsPay: boolean;

  /**
   * 是否已反馈 的两个字段 || 
   */
  Rejected: boolean;

  /**
   * 是否已反馈 的两个字段 || 
   */
  NeedAppend: boolean;

  /**
   * 是否已受理
   */
  Accepted: boolean;


  /**
   * 已提交 / 未提交
   */
  Locked: boolean;

  /**
   * 排队人数
   */
  QueueIndex: string;


  /**
   * 进度状况
   */
  Tips: string;
  /**
   * 根据是否存在已受理日期来判断是否已经受理
   */
  AcceptDate: string,

  /**
   * 是否存在义务人权利人
   */
  Persons: PersonModel[],

}

/**
 * 批量业务Children
 */

export interface businessChildrenModel {

  /**
 * 手机号码
 */
  MobilePhone: string,

  /**
 * 申请人
 */
  PersonName: string,

  /**
 * 业务名称
 */
  ProjectName: string,

  /**
 * 是否存在义务人权利人
 */
  Persons: PersonModel[],

  /**
  * 批量受理号
  */
  AppointmentNo: string,

  /**
  * 申请人身份证
  */
  PersonNo: string,

  /**
    * 判断选择状态
    */
  Isselect: boolean,
}

export interface PersonModel {

  /**
   * ID
   */
  Id: string,

  /**
   * 义务人名字
   */
  PersonName: string,

  /**
   * 义务人标签
   */
  RoleName: string,
}