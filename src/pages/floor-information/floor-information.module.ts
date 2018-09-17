import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FloorInformationPage } from './floor-information';

@NgModule({
  declarations: [
    FloorInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(FloorInformationPage),
  ],
})
export class FloorInformationPageModule {}
