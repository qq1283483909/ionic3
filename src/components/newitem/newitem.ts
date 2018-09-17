import { NewsDetailPage } from './../../pages/news-detail/news-detail';
import { AboutPage } from './../../pages/about/about';
import { NavController } from 'ionic-angular';

import { NewsItem } from './../../providers/news/news';
import { Component, Input } from '@angular/core';

/**
 *  资讯页新闻项
 *  
 */
@Component({
  selector: 'newitem',
  templateUrl: 'newitem.html',
})
export class NewItemComponent {

  //新闻的模型
@Input() item: NewsItem = <NewsItem>{};

//用于变换的样式，因为首页和相关资讯的样式不一样
@Input() IsHome:boolean;

  constructor(private navCrel: NavController) {
  }
ionViewDidEnter(){
}
  newsdetailVC() {
      this.navCrel.push(NewsDetailPage,{
      id:this.item.Id
      });
  }

}
