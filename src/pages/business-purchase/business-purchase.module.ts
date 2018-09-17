import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessPurchasePage } from './business-purchase';

@NgModule({
  declarations: [
    BusinessPurchasePage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessPurchasePage),
  ],
})
export class BusinessPurchasePageModule {}
