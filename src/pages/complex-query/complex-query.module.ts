import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplexQueryPage } from './complex-query';

@NgModule({
  declarations: [
    ComplexQueryPage,
  ],
  imports: [
    IonicPageModule.forChild(ComplexQueryPage),
  ],
})
export class ComplexQueryPageModule {}
