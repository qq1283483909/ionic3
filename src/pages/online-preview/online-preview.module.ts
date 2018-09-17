import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnlinePreviewPage } from './online-preview';

@NgModule({
  declarations: [
    OnlinePreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(OnlinePreviewPage),
  ],
})
export class OnlinePreviewPageModule {}
