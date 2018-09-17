import { DirectivesModule } from './../../directives/directives.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckdetailPage } from './checkdetail';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CheckdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckdetailPage),
    PipesModule,
    DirectivesModule,
  ],
})
export class CheckdetailPageModule {}
