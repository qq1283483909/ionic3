import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { ProtocolModelPage } from './protocol-model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProtocolModelPage,
  ],
  imports: [
    IonicPageModule.forChild(ProtocolModelPage),HttpClientModule,CommonModule,IonicModule
  ],
  entryComponents: [
    ProtocolModelPage,
  ]
})
export class ProtocolModelPageModule {}
