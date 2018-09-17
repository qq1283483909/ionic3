import { newsdetailitem } from './news';
import { Observable } from 'rxjs/Rx';
import { ApiUrlManagement } from './../../infrastructure/api-url-management';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
 新闻相关服务方法
*/
@Injectable()
export class NewsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NewsProvider Provider');
  }

  /**
   * 获取新闻列表
   */
  getNewsList(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(ApiUrlManagement.NewList);
  }

  /**
   * 获取新闻列表 带参数 如果是第一页说明是刷新,需要在head加上是否再刷新
   */
  getAllNewList(page: number): Observable<NewsItem[]> {

    return page == 1 ? this.http.get<NewsItem[]>(ApiUrlManagement.NewList, {
      params: {
        page: page.toString(),
        pagesize: '10'
      }, headers: {
        'x-refresh': 'true'
      }
    }) : this.http.get<NewsItem[]>(ApiUrlManagement.NewList, {
      params: {
        page: page.toString(),
        pagesize: '10'
      }
    });
  }

  /**
   * 新闻详情
   * @param newsid  新闻id
   * 
   */
  getNewdetail(newsid: string): Observable<newsdetailitem> {

    return this.http.get<newsdetailitem>(ApiUrlManagement.newsdetail, {
      params: {
        id: newsid
      }
    });
  }


  /**
   * 获取标题
   */
  getbusiness(): Observable<bustinguide> {

    return this.http.get<bustinguide>(ApiUrlManagement.businessguide);
  }



  /**
   * 获取GuideSonModels不动产标题HTML信息
   */
  getbusinessguidelist(informationtopic: string): Observable<bustinguide> {

    return this.http.get<bustinguide>(ApiUrlManagement.businessguidelist, {
      params: {
        id: informationtopic
      }
    })
  }


  /**
   * 获取GuideSon
   */
  getbusinessguideinformation(informationtable: string): Observable<informationpage> {

    return this.http.get<informationpage>(ApiUrlManagement.businessguideinformation, {
      params: {
        id: informationtable
      }
    })
  }


  /**
   * 获取IntrosModel 信息
   */
  getIntrosMode(): Observable<IntrosModeModule> {

    return this.http.get<IntrosModeModule>(ApiUrlManagement.IntrosModel);
  }




  /**
 * 	获取IInfoModel - 》Name、Infos
 */

  getIInfoModeName(int: string): Observable<IntrosModeModule> {

    return this.http.get<IntrosModeModule>(ApiUrlManagement.IntrosModelName, {
      params: {
        Id: int
      }
    });
  }

}



/**
 * 新闻Model
 */
export interface NewsItem {

  /**
   * 内容
   */
  Content: string,

  /**
   * 子标题
   */
  SubTile: string,

  /**
   * 标题图片链接
   */
  TitleImg: string,

  /**
   * 标题
   */
  Title: string,

  /**
   * 新闻类型
   */
  Type: string


  /**
   * 图片
   */
  Img: string,

  /**
   * ImgDescription
   */
  ImgDescription: string,

  /**
   * 新闻id
   */
  Id: string;

}

export interface newsdetailitem {

  /**
   * 子标题
   */
  SubTile: string,

  /**
   * 标题图片
   */
  TitleImg: string,

  /**
   * 标题
   */
  Title: string,

  /**
   * 新闻类型
   */
  Type: string,

  /**
   * 图片链接
   */
  Img: string,

  /**
   * 图片描述
   */
  ImgDescription: string,

  /**
   * 新闻Id
   */
  Id: string,

  /**
   * 新闻内容
   */
  Content: string,
}



/**
  * 获取标题Module
  */
export interface bustinguide {
  Name: string,

  SubList: bussinItem[],
}

export interface bussinItem {


  GuideSonId: string,


  Title: string,


  SonIndex: string,
}


/**
  * 获取GuideSon信息
  */
export interface informationpage {

  Content: string,

  GuideId: string,

  Id: string,

  Title: string,
}


/**
  * 获取IntrosModel 信息
  */
export interface IntrosModeModule {

  Id: string;

  Name: string;

  Infos: introst[],
}


export interface introst {

  Id: string;

  IntroductionId: string;

  Title: string;

  Content: string;

  Img: string;
}
