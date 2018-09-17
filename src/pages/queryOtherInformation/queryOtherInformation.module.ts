import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QueryOtherInformationPage } from './queryOtherInformation';

@NgModule({
  declarations: [
    QueryOtherInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(QueryOtherInformationPage),
    ComponentsModule
  ],
})
export class QueryOtherInformationPageModule {}
