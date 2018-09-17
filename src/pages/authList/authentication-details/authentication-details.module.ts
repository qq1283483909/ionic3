import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthenticationDetailsPage } from './authentication-details';

@NgModule({
  declarations: [
    AuthenticationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthenticationDetailsPage),
  ],
})
export class AuthenticationDetailsPageModule {}
