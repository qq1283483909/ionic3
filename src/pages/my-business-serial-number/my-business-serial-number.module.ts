import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBusinessSerialNumberPage } from './my-business-serial-number';

@NgModule({
  declarations: [
    MyBusinessSerialNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBusinessSerialNumberPage),
  ],
})
export class MyBusinessSerialNumberPageModule {}
