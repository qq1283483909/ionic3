import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreliminaryPage } from './preliminary';

@NgModule({
  declarations: [
    PreliminaryPage,
  ],
  imports: [
    IonicPageModule.forChild(PreliminaryPage),
  ],
})
export class PreliminaryPageModule {}
