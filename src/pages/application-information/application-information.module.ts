import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicationInformationPage } from './application-information';

@NgModule({
  declarations: [
    ApplicationInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplicationInformationPage),
  ],
})
export class ApplicationInformationPageModule {}
