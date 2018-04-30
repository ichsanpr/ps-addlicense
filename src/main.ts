import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
//import { CookieService } from 'angular2-cookie/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import * as nodemailer from 'nodemailer'; 

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
