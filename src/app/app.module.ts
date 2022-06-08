import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// State Managament
import { EffectsModule } from '@ngrx/effects';
import { cartEffects } from './_store/effects/cart.effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './_store/reducers';
import { userEffects } from './_store/effects/user.effects';
import { addressEffects } from './_store/effects/address.effects';

// Interceptor
import { CommonInterceptor } from './_interceptors/common.interceptor';

//Custom Modules
import { MaterialModule } from './modules/material.module';
import { SharedModule } from './modules/shared.module';
import { CommonComponentsModule } from './modules/common-components.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    CommonComponentsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([cartEffects , userEffects , addressEffects]),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS , useClass: CommonInterceptor , multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
