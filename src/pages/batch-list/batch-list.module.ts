import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BatchListPage } from './batch-list';

@NgModule({
  declarations: [
    BatchListPage,
  ],
  imports: [
    IonicPageModule.forChild(BatchListPage),
  ],
})
export class BatchListPageModule {}
