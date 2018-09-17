import { ApiResult } from './../../interfaces/api-result';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiUrlManagement } from './../../infrastructure/api-url-management';

/*
  Generated class for the BuildingsearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BuildingsearchProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BuildingsearchProvider Provider');
  }

  /**
   * 获取银行列表
   */
  getBankList():Observable<ApiResult<{}>> {

    return this.http.get(ApiUrlManagement.getbankList);
  }

  /**
   * 获取d4-1下得银行列表
   */
  getBuildSearchBankList(code:string):Observable<ApiResult<{}>> {
    
    return this.http.get(ApiUrlManagement.getBuildSearchBankList,{params:{
      typecode:code
    }});
  }

  /**
   * 获取楼盘列表
   * @param searchStr  查找的字符串
   * @param page  页码
   */
  getSearchBuildList(searchStr:string,page:number = 1):Observable<ApiResult<{}>> {

      return this.http.get(ApiUrlManagement.getSearchBuildList,{params:{
        q:searchStr,
        pagesize:'10',
        page:page.toString()
      }});
    }


    /**
     * 获取楼层信息
     */
    getBuildFloorInfo(buildNum:string):Observable<ApiResult<{}>> {

      return this.http.get(ApiUrlManagement.getBuildFloorInfo,{params:{
        BDCUnitNo:buildNum
      }})
    }

    
}

export interface bankModel {
  BankName:string,
}

export interface buildSearchBankModel {
  Key:string;
  Value:string;
}

export interface BuildModel {
  BDCUnitNo:string,
  BdcUnits:string,
  Location:string,
  ProjectName:string,
  SurveyState:string,
}

export interface floorModel {

  /**
   * 层数
   */
  FloorNo:number,
  
  /**
   * 地址
   */
BDCAddress:string,

/**
 * 面积
 */
BDCArea:string,

/**
 * 单元号
 */
BDCUnitNo:string,

/**
 * 能否选择
 */
CanSelect:boolean,

/**
 * 几单元几号
 */
RoomPart:string,

/**
 * 房屋用途
 */
RoomUsage:string,

/**
 * 不可选理由
 */
CannotSelectReason:string,


}