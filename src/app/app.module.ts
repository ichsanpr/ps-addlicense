import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { AngularFireModule } from 'angularfire2';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { PaymentFormComponent } from './payment-form/payment-form.component';
//import { CookieService } from 'angular2-cookie/core';
import { CookieService } from 'angular2-cookie/services/cookies.service'; 
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
//import { CheckoutService } from './checkout.service';
//import { AuthService, AppGlobals } from 'angular2-google-login';


@NgModule({
  declarations: [
    AppComponent,
    PaymentFormComponent
  ],
  imports: [
    BrowserModule,    
  //  AngularFireModule.initializeApp(environment.firebase),
  //  AngularFireDatabaseModule,
    FormsModule
    
  ],
  //providers: [AuthService],
  providers: [
    CookieService,
    Location, 
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


