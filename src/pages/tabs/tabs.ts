import { ContactPage } from './../contact/contact';

import { Component, ViewChild } from '@angular/core';
import {Tabs} from "ionic-angular";
import { AboutPage } from '../about/about';

import { HomePage } from '../home/home';
import { AuthenticationPage } from '../authentication/authentication';
import { ProgressQueryPage } from '../progress-query/progress-query';
import { BusinessPage } from '../business/business';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('mainTabs') tabs:Tabs;
  
  tab1Root = HomePage;
  tab2Root = ContactPage;
  tab3Root = AuthenticationPage;
  constructor() {
    
  }
}
