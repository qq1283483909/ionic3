import { AuthenticationDetailsPageModule } from './../pages/authList/authentication-details/authentication-details.module';
import { AuthenticationProvider } from './../providers/authentication/authentication';
import { AuthenticationListPageModule } from './../pages/authList/authentication-list/authentication-list.module';
import { QueryEntity } from './../infrastructure/query-entity'; 
import { BusinessthirdPageModule } from './../pages/businessthird/businessthird.module';
import { QueryOtherInformationPage } from './../pages/queryOtherInformation/queryOtherInformation';
import { ForgetpasswordPageModule } from './../pages/forgetpassword/forgetpassword.module'; 
import { FormsModule } from '@angular/forms';
import { RegisterPageModule } from './../pages/register/register.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BDCApp } from "./app.component";
import { QRScanner } from '@ionic-native/qr-scanner';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//#region 自定义证件 
import { DirectivesModule } from '../directives/directives.module'; 

//#endregion

//#region 自定义主件
import { AuthenticationPageModule } from '../pages/authentication/authentication.module';


//#endregion

//#region   页面

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { QueryinformationPage } from '../pages/queryinformation/queryinformation';
//#endregion


//#region 工具类

import { UserInfo } from '../infrastructure/user-info';
import { API_URL } from '../infrastructure/host-address';
import { AuthActionSheet } from '../models/AuthActionSheet';
import { AccountProvider } from '../providers/account/account';


import { AuthInterceptor, CachingInterceptor } from '../infrastructure/http-interceptor';
import { LoginPageModule } from '../pages/login/login.module';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpHandler } from '@angular/common/http';
import { AuthProvider } from '../providers/auth/auth';
import { CommonHelper } from '../models/commonHelper';
import { ComponentsModule } from '../components/components.module';
import { NewsDetailPageModule } from '../pages/news-detail/news-detail.module';
import { PipesModule } from '../pipes/pipes.module';
import { CheckservicePageModule } from '../pages/checkservice/checkservice.module';
import { NewsProvider } from '../providers/news/news';
import { ProtocolModelPageModule } from '../pages/protocol-model/protocol-model.module';
import { ScanPageModule } from '../pages/scan/scan.module';
import { CheckserveProvider } from '../providers/checkserve/checkserve';
import { CheckdetailPageModule } from '../pages/checkdetail/checkdetail.module';
import { CheckrecordsPageModule } from '../pages/checkrecords/checkrecords.module';
import { RequestCache, RequestCacheWithMap } from '../infrastructure/request-cache';
import { PreliminaryPageModule } from '../pages/preliminary/preliminary.module';
import { OnlinePreviewPageModule } from '../pages/online-preview/online-preview.module';
import { OnlinePageModule } from '../pages/online/online.module';
import { TypelistProvider } from '../providers/typelist/typelist';
import { ProgressQueryPageModule } from '../pages/progress-query/progress-query.module';
import { PreviewPicturePageModule } from '../pages/preview-picture/preview-picture.module';


import { QueryProvider } from './../providers/query/query'; 
import { QueryhistorPageModule } from './../pages/queryhistor/queryhistor.module';
import { BusinessPageModule } from '../pages/business/business.module';
import { RelevantdepartmentsPageModule } from '../pages/relevantdepartments/relevantdepartments.module';
import { BusinesssecondPageModule } from '../pages/businesssecond/businesssecond.module';
import { RelevantdepartnicesPageModule } from '../pages/relevantdepartnices/relevantdepartnices.module';
import { RightpersoninformationPageModule } from '../pages/rightpersoninformation/rightpersoninformation.module';
import { PersonalfileOpenfilePageModule } from '../pages/personalfile-openfile/personalfile-openfile.module';


import { Device } from '@ionic-native/device';
import { ComplexQueryPageModule } from '../pages/complex-query/complex-query.module';
import { BuildingsearchProvider } from '../providers/buildingsearch/buildingsearch'; 
import { MyBusinessSerialNumberPageModule } from '../pages/my-business-serial-number/my-business-serial-number.module';
import { MybusinessProvider } from '../providers/mybusiness/mybusiness';
import { FloorInformationPageModule } from '../pages/floor-information/floor-information.module';
import { FloorInformationEditingPageModule } from '../pages/floor-information-editing/floor-information-editing.module';
import { RealEstateInformationPageModule } from '../pages/real-estate-information/real-estate-information.module';
import { OnLineServiceProvider } from '../providers/on-line-service/on-line-service';
import { ApplicationInformationPageModule } from '../pages/application-information/application-information.module';
import { BatchListPageModule } from '../pages/batch-list/batch-list.module';
import { BusinessPurchasePageModule } from '../pages/business-purchase/business-purchase.module';
import { PerfectTheInformationPageModule } from '../pages/perfect-the-information/perfect-the-information.module';
import { UploadPicturesPageModule } from '../pages/upload-pictures/upload-pictures.module';
import { FeedbackPageModule } from '../pages/feedback/feedback.module';
import { ConnectionPageModule } from '../pages/connection/connection.module';

//#endregion





@NgModule({
  declarations: [
    BDCApp,
    AboutPage,
    ContactPage,
    ContactPage,
    HomePage,
    TabsPage,
    QueryinformationPage,
    QueryOtherInformationPage
  ],
  imports: [
    LoginPageModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AuthenticationPageModule,
    OnlinePageModule,
    OnlinePreviewPageModule,
    PreliminaryPageModule,
    DirectivesModule,
    RegisterPageModule,
    ForgetpasswordPageModule,
    ProgressQueryPageModule,
    BusinessPageModule,
    RelevantdepartmentsPageModule,
    RelevantdepartnicesPageModule,
    RightpersoninformationPageModule,
    PersonalfileOpenfilePageModule,
    ApplicationInformationPageModule,
    BatchListPageModule,
    BusinessPurchasePageModule,
    PerfectTheInformationPageModule,
    UploadPicturesPageModule,
    IonicModule.forRoot(BDCApp, {
      tabsHideOnSubPages: true,    //导航页覆盖底下tab
      backButtonText:'',
      backButtonIcon:'ios-arrow-back'
    }),
    ComponentsModule, 
    NewsDetailPageModule,
    PipesModule,
    CheckservicePageModule,
    ProtocolModelPageModule,
    ScanPageModule,
    CheckdetailPageModule,
    CheckrecordsPageModule,
    PreviewPicturePageModule,
    BusinesssecondPageModule,
    BusinessthirdPageModule,
    QueryhistorPageModule, 
    ComplexQueryPageModule,
    AuthenticationListPageModule,
    AuthenticationDetailsPageModule,
    MyBusinessSerialNumberPageModule,
    FloorInformationPageModule,
    FloorInformationEditingPageModule,
    RealEstateInformationPageModule,
    FeedbackPageModule,
    ConnectionPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BDCApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    QueryinformationPage,
    QueryOtherInformationPage,
  ],
  providers: [
    UserInfo,
    CommonHelper,
    AuthActionSheet,
    StatusBar,
    SplashScreen,
    AuthProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: API_URL,
       useValue: 'https://test.nngeo.com/'
     // useValue:'http://practice.nngeo.com/'
    },
    [
      { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
    ],
    { provide: RequestCache, useClass: RequestCacheWithMap },
    AccountProvider,
    NewsProvider,
    QRScanner,
    CheckserveProvider,
    TypelistProvider,
    QueryProvider,
    Device,
    BuildingsearchProvider,
    AuthenticationProvider,
    QueryEntity,
    MybusinessProvider,
    OnLineServiceProvider,
  ]
})
export class AppModule { }
