import { OnlinePage } from './../pages/online/online';

//API Url统一管理数组
export const ApiUrlManagement = {


  /**
   * 登录
   */
  login: 'token',       // 登录
  /**
   * 获取调起芝麻认证url
   * 
   */

  zhimaUrl: 'api/appointment/GetZhimaAuthToken',
  /**
   * 注册API
   */
  register: 'api/account/RegisterModel',

  /**
   * 注册获取短信验证码
   */

  code: '/api/security/SendMobileValidCode',

  /**
  * 重置密码API
  */
  forgetpassword: 'api/account/ResetPassword',

  /**
 * 重置密码获取短信验证码
 */

  codee: 'api/Account',

  /**
* 业务进度查询
*/
  progressquery: 'api/BdcQuery/Query2',
  /**
   * 新闻列表
   */

  NewList: 'api/bdcappdata/GetNewsList',

  /**
   * 新闻详情
   */
  newsdetail: 'api/bdcappdata/GetNewsItem',

  /**
   * 扫描二维码查档
   */
  qrscancheckservice: 'api/appointment/GetHtmlContentResultByIdentityCode',

  /**
   * 查档记录
   */
  checkrecordes: 'api/appointment/GetCodePage',
  /**
   * 业务类型列表
   */
  Online: 'api/appointment/v2/GetProjectTypeList2',

  /**
   * 获取标题
   */
  businessguide: 'api/BdcAppData/GetGuide',

  /**
  * 获取GuideSonModels不动产标题HTML信息
   */
  businessguidelist: 'api/BdcAppData/GetGuideSonList',

  /**
* 获取GuideSon
 */
  businessguideinformation: 'api/BdcAppData/GetGuideSon',


  /**
* 获取IntrosModel 信息
*/
  IntrosModel: 'api/BdcAppData/GetIntroduction',



  /**
 * 获取IInfoModel - 》Name、Infos
 */

  IntrosModelName: 'api/BdcAppData/GetIInfo',


  /**
   * 个人查档->查询个人档
   */
  PersonUploadSave: '/api/appointment/v2/PersonUploadSave',
  /**
   * 个人查档->查询家庭成员
   */
  FamilyUploadSave: '/api/appointment/v2/FamilyUploadSave',
  /**
   * 个人档->查询公开档记录
   */
  getOpenArchivalList: '/api/appointment/getOpenArchivalList',
  /**
   * 个人档->查询名下档和家庭档记录
   */
  getPersonArchivalList: '/api/appointment/GetPersonArchivalList',
  /**
   * 机构查档->备案企业
  */
  getCompanies: '/api/appointment/GetCompanies',
  /**
   * 机构查档->个人档和名下档查询
   */
  PersonArchivalQuery: '/api/appointment/v2/PersonArchivalQuery',
  /**
   * 机构查档->个人档记录
   */
  getPersonOrganization: '/api/appointment/GetPersonOrganization',

  /**
   * 楼盘查询里面的银行列表
   */
  getbankList: '/api/appointment/GetBankList',
  /**
   * 获取授权列表
   */
  getAuthorizationList: '/api/appointment/GetAuthorizationList',
  /**
   * 授权列表详情
   */
  getBusinessiInfo: '/api/appointment/GetBusinessiInfo',

  /**
   * 获取楼盘查询的银行列表
   */
  getBuildSearchBankList: '/api/appointment/GetCompanyNames',

  /**
   * 搜索楼层列表
   */
  getSearchBuildList: '/api/appointment/GetBankBuildingList',

  /**
   * 楼层信息
   */
  getBuildFloorInfo: '/api/appointment/GetBuildingHousesList',

  /**
   * 我的业务列表
   */
  getMyBusinessList: '/api/appointment/GetMyList',

  /**
   * 在线办理获取的下拉菜单数据
   */
  GetonlinePullMenuDate: 'api/appointment/GetCompanyNames',

  /**
   * companyInfo 获取type类型
   */
  GetOnlinePullListType: 'api/appointment/GetCompanyInfo',

  /**
   * 在线办理接口
   */
  OnlineWorkApi: 'api/appointment/checkhouseinfo',

  /**
   * 获取信息详情
   */

  BusinessPurchaseApi: 'api/appointment/GetUserInfoByIdFromMongo',

  /**
    * 获取信息详情
    */
  ApplicationInformationApi: 'api/appointment/GetUserByIdFromMongoChildren',


  /**
    * 加入预约列表
    */
   AddappointmentlistApi: 'api/appointment/CreateTmpPickdateBatch',



};




