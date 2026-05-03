import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// 🔥 TAMBAHAN UNTUK FORMAT INDONESIA
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import { LOCALE_ID } from '@angular/core';

// 🔥 REGISTER LOCALE
registerLocaleData(localeId);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // 🔥 TAMBAHAN INI
    { provide: LOCALE_ID, useValue: 'id-ID' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}