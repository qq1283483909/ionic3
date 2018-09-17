import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetpasswordPage } from './forgetpassword';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ForgetpasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgetpasswordPage),ComponentsModule
  ],
})
export class ForgetpasswordPageModule {}
