import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthenticationPage } from './authentication';
import { DirectivesModule } from '../../directives/directives.module';


@NgModule({
  declarations: [
    AuthenticationPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthenticationPage),
    DirectivesModule
   
  ]
})
export class AuthenticationPageModule {}
