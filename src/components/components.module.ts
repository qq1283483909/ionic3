import { DirectivesModule } from './../directives/directives.module';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { NewItemComponent } from './newitem/newitem';
import { VerificationComponent } from './verification/verification';
import { QuerytabsComponent } from './querytabs/querytabs';
import { TwoWayComponent } from './budongchancheck/budongchancheck';
import { BeforenameComponent } from './beforename/beforename';
import { ImgLazyLoadComponent } from './img-lazy-load/img-lazy-load';
import { YuzidianCheckComponent } from './yuzidian-check/yuzidian-check';
import { EnterpriseComponent } from './enterprise/enterprise'; 
// import { BudongchancheckComponent, TwoWayComponent } from './budongchancheck/budongchancheck';
// import { IonicImageLoader } from 'ionic-image-loader';


@NgModule({
	declarations: [NewItemComponent,
    VerificationComponent,
    QuerytabsComponent,
    TwoWayComponent,
    BeforenameComponent,
    ImgLazyLoadComponent,
    YuzidianCheckComponent,
    EnterpriseComponent, 
    // BudongchancheckComponent,
    ],
    imports: [
        DirectivesModule,
        IonicPageModule, 
        // IonicImageLoader.forRoot()
    ],
	exports: [NewItemComponent,
    VerificationComponent,
    QuerytabsComponent,
    TwoWayComponent,
    BeforenameComponent,
    ImgLazyLoadComponent,
    YuzidianCheckComponent,
    EnterpriseComponent, 
    // BudongchancheckComponent,
    ]
})
export class ComponentsModule {}
