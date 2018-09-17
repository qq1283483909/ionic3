import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessthirdPage } from './businessthird';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    BusinessthirdPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessthirdPage),PipesModule
  ],
})
export class BusinessthirdPageModule {}
