import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FloorInformationEditingPage } from './floor-information-editing';

@NgModule({
  declarations: [
    FloorInformationEditingPage,
  ],
  imports: [
    IonicPageModule.forChild(FloorInformationEditingPage),
  ],
})
export class FloorInformationEditingPageModule {}
