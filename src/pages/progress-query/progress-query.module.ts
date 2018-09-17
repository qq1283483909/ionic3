import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgressQueryPage } from './progress-query';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ProgressQueryPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgressQueryPage),ComponentsModule
  ],
})
export class ProgressQueryPageModule {}
