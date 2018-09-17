import { Component,ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
declare var Swiper;
/**
 * Generated class for the PreviewPicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preview-picture',
  templateUrl: 'preview-picture.html',
})
export class PreviewPicturePage {

  @ViewChild('panel') panel: ElementRef;

  /**
   * 进入图片浏览器时的索引
   */
  initialSlide = 0;

  /**
   * 图片路径数组
   */
  picturePaths: string[] = [];

  constructor(private viewCtrl: ViewController, public navParams: NavParams) {
  
    this.initialSlide = navParams.get('initialSlide');
    this.picturePaths = navParams.get('picturePaths');
  }


  ionViewDidLoad() {
    // http://www.swiper.com.cn/api/index.html
    new Swiper(this.panel.nativeElement, {
      /**
       * 初始化显示第几个
       */
      initialSlide: this.initialSlide, 

      /**
       *  双击,手势缩放
       */
      zoom: true, 

      /**
       * 循环切换
       */
      loop: false, 

      /**
       *  延迟加载
       */
      lazyLoading: true, 
      
      /**
       * lazyLoadingInPrevNext : true,
       */
      lazyLoadingOnTransitionStart: true,
      
      /**
       *  分页器
       */
      pagination: '.swiper-pagination', 

      /**
       * 分页器类型
       */
      paginationType: 'fraction', 

      /**
       * 点击消失
       */
      onClick: () => {
        this.dismiss();
      }
    });
  }

  /**
   * dismiss视图
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
