import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MybusinessProvider } from '../../providers/mybusiness/mybusiness';

/**
 * Generated class for the BatchListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-batch-list',
  templateUrl: 'batch-list.html',
})
export class BatchListPage {

  ionViewDidLoad() {
    console.log('ionViewDidLoad BatchListPage');
  }

}
