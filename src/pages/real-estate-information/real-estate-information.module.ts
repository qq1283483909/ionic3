import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RealEstateInformationPage } from './real-estate-information';

@NgModule({
  declarations: [
    RealEstateInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(RealEstateInformationPage),
  ],
})
export class RealEstateInformationPageModule {}
