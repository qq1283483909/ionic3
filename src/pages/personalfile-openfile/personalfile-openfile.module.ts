import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalfileOpenfilePage } from './personalfile-openfile';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PersonalfileOpenfilePage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalfileOpenfilePage),
    ComponentsModule,
  ],
})
export class PersonalfileOpenfilePageModule {}
