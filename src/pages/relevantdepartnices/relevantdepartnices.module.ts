import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RelevantdepartnicesPage } from './relevantdepartnices';
import { DirectivesModule } from '../../directives/directives.module';


@NgModule({
  declarations: [
    RelevantdepartnicesPage,
  ],
  imports: [
    IonicPageModule.forChild(RelevantdepartnicesPage),
    PipesModule,
    DirectivesModule
  ],
})
export class RelevantdepartnicesPageModule {}
