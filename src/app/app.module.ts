import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Rating
import { NgxStarRatingModule } from 'ngx-star-rating';

// Material Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AddEditAddressComponent } from './components/add-edit-address/add-edit-address.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';


import { NgxMaskModule } from 'ngx-mask';

// State Managament
import { EffectsModule } from '@ngrx/effects';
import { cartEffects } from './_store/effects/cart.effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './_store/reducers';
import { userEffects } from './_store/effects/user.effects';
import { addressEffects } from './_store/effects/address.effects';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    CartComponent,
    LoginModalComponent,
    RegisterModalComponent,
    NavbarComponent,
    ProductDetailComponent,
    AddEditAddressComponent,
    EditProfileComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatProgressBarModule,
    NgxStarRatingModule,
    MatChipsModule,
    MatStepperModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot(),

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
