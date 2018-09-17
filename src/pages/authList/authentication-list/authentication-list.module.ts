import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthenticationListPage } from './authentication-list'; 

@NgModule({
  declarations: [
    AuthenticationListPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthenticationListPage), 
  ],
})
export class AuthenticationListPageModule {}
