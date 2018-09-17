import { ZhiMaUriPara } from './../providers/auth/auth';

import { AuthCount } from './AuthActionSheet';
import { Injectable } from '@angular/core';
import { ActionSheetController, ActionSheetButton, ActionSheet } from 'ionic-angular';
import Rx, { Observable, Observer } from 'rxjs/Rx';
import { AuthProvider } from '../providers/auth/auth';
import { ApiResult } from '../interfaces/api-result';
import { CommonHelper } from './commonHelper';

declare var cordova; 

/**
 *   认证actionsheet帮助类
 */
@Injectable()
export class AuthActionSheet{

    /**
     * 记录认证历史记录
     */
   private authHistory: AuthCount[] = [];          
 
    /**
    * 最大缓存记录数
    */    
   private maxCache: number = 20; 
   
   /**
   * 芝麻最多能失败多少次
   */
   private maxZm: number = 2;                      
   /**
   * 公安最多能失败多少次
   */
   private maxGongAn: number = 1;      
   
   /**
   * actionSheet对象
   */
   private actionSheetObj: ActionSheet;
    /**
    *构造方法
    */
    constructor(private actionSheetCtrl: ActionSheetController, private authPro: AuthProvider, private commonHelper: CommonHelper) {

    }



    /**
    * 根据身份证号 获取认证记录
    * @param idNo 身份证
    */
  private  recordAuth(idNo: string): AuthCount {

        // 遍历数组 查找已存的idNo对象 
      const authCounts =  this.authHistory.filter(ele =>{
            return ele.idNo == idNo;
        });

        if(authCounts.length == 0) {
            // 如果身份证不存在就新添加一个
            const authCount = <AuthCount>{
                idNo : idNo,
                typeCount: []
            };
            // 插入到数组头
            this.authHistory.unshift(authCount);

            //超过最大长度就把最后一个弹出
            if(this.authHistory.length > this.maxCache){
                this.authHistory.pop();
            }
            return authCount; 
        }else{
            return authCounts[0];
        }
    }


    
    /**
     * 添加认证记录记数
     * @param authcount 认证记录
     * @param type 认证类型
     */
   private addRecord(authcount: AuthCount, type: AuthType){
       if(!authcount) return;
       // 获取认证类型记录
       const types =  authcount.typeCount.filter(ele =>{
           return ele.type == type;
       });
       // 如果记录不存在
       if(types.length == 0){
           // 添加一个新记录
           const t = <TypeCount> { 
                type : type, 
                count : 1 
            };
            authcount.typeCount.unshift(t);
       }else {
        // 记录加1
        types[0].count ++;
       }
    }
  

    /**
     * 判断是否显示微软认证
     * @param idNo 身份证
     * 
     */
    private showWeiRuan(idNo: string): boolean {
        // 当前手机从来没有认证过
       if( !this.authHistory.length) return false;
       const authCounts = this.authHistory.filter(e=>{
           return e.idNo == idNo;
       });
       // idNo 从来没有认证过
       if(!authCounts.length)  return false;
       // 定义回调
       const callBack : (typeCount: TypeCount, authType: AuthType)=> boolean = function( typeCount, authType){
           return typeCount.type == authType;
       }

       const zm = authCounts[0].typeCount.filter(e=>{
           return callBack(e, AuthType.芝麻);
       });
       // 芝麻没有认证过
       if(!zm.length) return false;
       const gongAn = authCounts[0].typeCount.filter(e => {
           return callBack(e, AuthType.公安);
       });
       // 公安没有认证过
       if(!gongAn.length) return false;
       //两种认证都达到设定次数
       if(zm[0].count >= this.maxZm && gongAn[0].count >= this.maxGongAn) return true;


       return  false;
    }


/**
 * 调起芝麻认证
 * @param idNo 身份证
 * @param name 姓名
 * @param ob 观察者
 */
    private showZhiMaAuth(idNo: string, name: string, ob: Observer<string>){


        cordova.plugins.ZhiMaAuth.GetMetaInfo(res=>{
            const metaInfo = <ZhiMaUriPara>JSON.parse(res);
            metaInfo.certName = name;
            metaInfo.certNo = idNo;
            this.authPro.getZhiMaUri(metaInfo).subscribe(data =>{
                const apiResult = <ApiResult<any>>data;
                if (apiResult.StateCode === 1) {
                   const zhiMa = JSON.parse( apiResult.Data);
                   cordova.plugins.ZhiMaAuth.StartService(zhiMa.Url, res => {
                   
                     ob.next(res);
                     ob.complete();
                   }, error =>{
                    ob.next(error);
                    ob.complete();
                   })
                }else  {
                    this.commonHelper.presentToast(apiResult.Message);
                }
              })
            });
    }


     /**
     * 初始化按钮组
     * @method initButtons  方法名
     * @param  idNo  身份证
     * @param  name  姓名
     * @param  phone  手机号
     * @return  ActionSheetButton[]  
     */
    private initButtons(authCount: AuthCount, idNo : string, name : string, phone : string , ob: Observer<string>): ActionSheetButton[] {
        const buttons: ActionSheetButton[] = [
            {
                text: '公安认证',
                role: 'destructive',
                handler: () => {
                  console.log('公安');
                    this.addRecord(authCount, AuthType.公安);
                    // 调起公安认证
                    cordova.plugins.GongAnAuth.StartAuth(idNo , name, phone, valud =>{
                        ob.next(valud);
                    });
                }
            },
            {
                text: '芝麻认证',
                handler: () => {
                    console.log('芝麻');
                    this.addRecord(authCount, AuthType.芝麻);
                    this.showZhiMaAuth(idNo, name, ob);
                    
                }
           }
        ];
        if(this.showWeiRuan(idNo)){
            buttons.push({
                text: '微软认证',
                handler: () => {
                    console.log('微软');
                    this.addRecord(authCount, AuthType.微软);
                    ob.next('我是微软返回的');

                    cordova.plugins.WeiRuanAuth.GotoWeiRuanAuth(res => {
                        //返回的是json字符串包含状态 身份证号，照片base64编码
                        alert(res);
                    });

                }
            })
        }
        buttons.push({
            text: '取消',
            role: '取消',
            handler: () => {
              console.log('取消 clicked');
            }
          });
          return buttons;
    }


    /**
    * 弹出actionsheet
    *  @param  idNo  身份证
    *  @param  name  姓名
    *  @param  phone  手机号
    *  @returns Observable<T>
    */
     
    public  actionSheet<T>(name: string , idNo: string, phone: string) : Observable<T>{
        !!this.actionSheetObj && this.actionSheetObj.dismiss();
        const authCount = this.recordAuth(idNo);        //获取当前idNo 认证记录
        
        const observable : Observable<any> = Rx.Observable.create(observe => {
            const ob = observe as Observer<string>;

            this.actionSheetObj = this.actionSheetCtrl.create({
                title: '请选择认证方式',
                buttons:this.initButtons(authCount, idNo, name, phone, ob)
            });
            this.actionSheetObj.present();
        });
            

        return observable.map(value => <T>JSON.parse(value));
    }

}

/**
 * 证件号认证记录
 */
export interface AuthCount{
    /**
     * 认证人身份证
     */
    idNo: string;
    /**
     * 认证类型记录 
     */       
    typeCount: TypeCount[];

}

/**
 *  类型认证记录
 */
export interface TypeCount{
    /**
     * 认证类型
     */
    type: AuthType;

    /**
     * 认证次数
     */    
    count: number;      
}
/**
 * 认证类型 枚举
 */
export enum AuthType{
    公安,
    芝麻,
    微软
}