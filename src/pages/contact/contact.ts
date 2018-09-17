import { Component } from '@angular/core';
import { NavController, Tabs } from 'ionic-angular';
import { NewsProvider, NewsItem } from '../../providers/news/news';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

 /**
   * 新闻列表数组
   */
  newsList: NewsItem[] = [];

  /**
   * 页码
   */
  page: number = 1;

  /**
   * 获取到Tabs
   */
  tabs:Tabs;

  /**
   * 加载更多
   */
  FootisEnable: boolean = true;

  constructor(public navCtrl: NavController, public newprovide: NewsProvider) {
    
    this.tabs = navCtrl.parent;
  }

  ngOnInit() {

    this.newprovide.getAllNewList(this.page).subscribe(res => {
      this.newsList = res;
      this.FootisEnable = res.length < 10 ? false : true;
    });

  }

  /**
   * 下拉刷新
   */
  doRefresh(refresher) {
    console.log("下拉刷新");

    this.page = 1;
    this.newprovide.getAllNewList(1).subscribe(res => {
      this.newsList = res;
      refresher.complete();

      this.FootisEnable = res.length < 10 ? false : true;

    }, err => {
      this.page = 1;
      refresher.complete();

      this.FootisEnable = false;
    });


  }

  /**
   * 上拉加载
   * @param infiniteScroll 可以通过此参数设置什么时候禁止滚动 和加载完成的动画
   */
  doInfinite(infiniteScroll) {

    console.log('上拉加载');
    console.log(this.page);

    this.page += 1;
    this.newprovide.getAllNewList(this.page).subscribe(res => {

      let tempArr = res;
      for (var i = 0; i < tempArr.length; i++) {
        this.newsList.push(tempArr[i]);
      }

      console.log('总个数' + this.newsList.length);
      infiniteScroll.complete();
      if (tempArr.length < 10) {
        this.FootisEnable = false;
      }
    }, error => {
      console.log('请求失败');
    });

  }


}
