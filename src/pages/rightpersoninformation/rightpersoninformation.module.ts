import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RightpersoninformationPage } from './rightpersoninformation';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';


@NgModule({
  declarations: [
    RightpersoninformationPage,
    
  ],
  imports: [
    IonicPageModule.forChild(RightpersoninformationPage),
    ComponentsModule,
    DirectivesModule
    
  ],
})
export class RightpersoninformationPageModule {}
