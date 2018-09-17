import { DirectivesModule } from './../../directives/directives.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckservicePage } from './checkservice';

@NgModule({
  declarations: [
    CheckservicePage,
  ],
  imports: [
    IonicPageModule.forChild(CheckservicePage),
    DirectivesModule,
  ],
})
export class CheckservicePageModule {}
