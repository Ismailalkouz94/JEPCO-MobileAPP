import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, FabContainer } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistrationPage } from '../pages/registration/registration';
import { SliderPage } from '../pages/slider/slider';
import { IonicStorageModule } from '@ionic/storage';
import { PublicVarProvider } from '../providers/public-var/public-var';
import { WelcomePage } from '../pages/welcome/welcome';

import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PaymentCentersPage } from '../pages/payment-centers/payment-centers';
import { GoogleMaps } from '@ionic-native/google-maps';
import { PreviousInvoicesPage } from '../pages/previous-invoices/previous-invoices';
import { InvoicesPage } from '../pages/invoices/invoices';
import { CalculatorPage } from '../pages/calculator/calculator';
import { PopoverComponent } from '../components/popover/popover';
import { TabsForPaymentComponent } from '../components/tabs-for-payment/tabs-for-payment';

import { CallNumber } from '@ionic-native/call-number';
import { PopoverPhoneNumbersComponent } from '../components/popover-phone-numbers/popover-phone-numbers';
import { PaymentMethodPage } from '../pages/payment-method/payment-method';
import { PaymentCenterListPage } from '../pages/payment-center-list/payment-center-list';
import { ChangeUserPage } from '../pages/change-user/change-user';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { VarCodePage } from '../pages/var-code/var-code';
import { LoadingServiceProvider } from '../providers/loading-service/loading-service';
import { LangServiceProvider } from '../providers/lang-service/lang-service';
import { SelectAccountPage } from '../pages/select-account/select-account';
import { AddSubProfilePage } from '../pages/add-sub-profile/add-sub-profile';
import { TipsServiceProvider } from '../providers/tips-service/tips-service';
import { PaymentCenterMapPage } from '../pages/payment-center-map/payment-center-map';
import { Geolocation } from '@ionic-native/geolocation';
import { ImageModalPage } from '../pages/imageModal/imageModal';
import { MapModalPage } from '../pages/map-modal/map-modal';
import { CalculatorWithoutSubPage } from '../pages/calculator-without-sub/calculator-without-sub';
import { TabsForCalcoulateComponent } from '../components/tabs-for-calcoulate/tabs-for-calcoulate';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistrationPage,
    SliderPage,
    WelcomePage,
    PaymentCentersPage,
    PreviousInvoicesPage,
    InvoicesPage,
    CalculatorPage,
    PopoverComponent,
    TabsForPaymentComponent,
    PopoverPhoneNumbersComponent,
    PaymentMethodPage,
    PaymentCenterListPage,
    ChangeUserPage,
    VarCodePage,
    SelectAccountPage,
    AddSubProfilePage,
    PaymentCenterMapPage,
    ImageModalPage,
    MapModalPage,
    CalculatorWithoutSubPage,
    TabsForCalcoulateComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonIcon:"md-arrow-back",
      backButtonText: '',
    }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistrationPage,
    SliderPage,
    WelcomePage,
    PaymentCentersPage,
    PreviousInvoicesPage,
    InvoicesPage,
    CalculatorPage,
    PopoverComponent,
    TabsForPaymentComponent,
    PopoverPhoneNumbersComponent,
    PaymentMethodPage,
    PaymentCenterListPage,
    ChangeUserPage,
    VarCodePage,
    SelectAccountPage,
    AddSubProfilePage,
    PaymentCenterMapPage,
    ImageModalPage,
    MapModalPage,
    CalculatorWithoutSubPage,
    TabsForCalcoulateComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    CallNumber,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PublicVarProvider,
    FabContainer,
    InAppBrowser,
    HttpServiceProvider,
    LoadingServiceProvider,
    LangServiceProvider,
    TipsServiceProvider,
    Geolocation
    
    
  ]
})
export class AppModule { }
