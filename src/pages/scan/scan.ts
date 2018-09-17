import { HttpClient } from '@angular/common/http';
import { CheckdetailPage } from './../checkdetail/checkdetail';
import { CheckserveProvider } from './../../providers/checkserve/checkserve';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { flatten } from '../../../node_modules/@angular/compiler';
/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  /**
   * 判断闪光灯
   */
  protected light: boolean = false; 

  /**
   * 判断摄像头
   */
  protected frontCamera: boolean = false; 

  /**
   * 控制显示背景，避免切换页面卡顿
   */
  isShow: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private qrScanner: QRScanner, private viewCtrl: ViewController, private checkserve: CheckserveProvider) {

    this.light = false;
    this.frontCamera = false;
    
  }

  /**
   * 视图加载完毕
   */
  ionViewDidLoad() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {

            this.checkserve.getHtmlContent(text).subscribe(res => {
              
              var temp = res.Data;

              if (temp && 11 == null){
              this.navCtrl.push(CheckdetailPage, {
                htmlStr: res.Data
              }
              );
            }else {
              alert('该二维码已失效');
            }
            }, err => {
              console.log('错误' + err);
            });
            this.qrScanner.hide(); 
            scanSub.unsubscribe(); 

            this.dismiss();
          });

          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {

          this.qrScanner.openSettings;

          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  /**
   * 视图消失
   */
  public dismiss(): void {
    this.viewCtrl.dismiss();
  }

  /**
   * 开关灯
   */
  toggleLight() {
    this.light = !this.light;
    if (this.light) {
      this.qrScanner.enableLight();
    } else {
      this.qrScanner.disableLight();

    }
  }

  /**
   * 切换摄像头
   */
  toggleCamera() {
    this.frontCamera = !this.frontCamera;
    if (this.frontCamera) {
      this.qrScanner.useFrontCamera();
    } else {
      this.qrScanner.useBackCamera();
    }
  }

  /**
   * 显示相机
   */
  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  /**
   * 隐藏相机
   */
  hideCamera() {

    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    this.qrScanner.hide();//需要关闭扫描，否则相机一直开着
  }


  // ionViewWillLeave() {
  //   window.document.querySelector('ion-app > .app-root').classList.remove('hide');
  //   this.qrScanner.destroy();
  // }
  // ionViewCanEnter() {
  //   if (this.qrScanner) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }


  ionViewWillEnter() {

    // let elements = document.querySelectorAll(".tabbar");
    //   if (elements != null) {
    //     Object.keys(elements).map((key) => {
    //       elements[key].style.display = 'none';
    //     });
    //   }

   
  }


  ionViewDidEnter() {
    // let elements = document.querySelectorAll(".tabbar");
    // if (elements != null) {
    //   Object.keys(elements).map((key) => {
    //     elements[key].style.display = 'none';
    //   });
    // }
    this.showCamera();
    this.isShow = true;//显示背景
    
  }


  ionViewWillLeave() {
    this.hideCamera();
  }

  ionViewDidLeave() {

  
    // let elements = document.querySelectorAll(".tabbar");
    // if (elements != null) {
    //   Object.keys(elements).map((key) => {
    //     elements[key].style.display = 'flex';
    //   });
    // }

  }

}
