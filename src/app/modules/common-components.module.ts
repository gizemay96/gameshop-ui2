import { NgModule } from '@angular/core';

import { SketlonComponent } from '../components/sketlon/sketlon.component';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import { AddEditAddressComponent } from '../components/add-edit-address/add-edit-address.component';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { LoginModalComponent } from '@app/components/login-modal/login-modal.component';
import { RegisterModalComponent } from '@app/components/register-modal/register-modal.component';

import { MaterialModule } from './material.module';
import { SharedModule } from './shared.module';
import { CommonModule } from '@angular/common';


@NgModule({
     declarations: [
          SketlonComponent,
          ConfirmationModalComponent,
          ProductDetailComponent,
          AddEditAddressComponent,
          EditProfileComponent,
          NavbarComponent,
          LoginModalComponent,
          RegisterModalComponent
     ],
     imports: [
          CommonModule,
          MaterialModule,
          SharedModule.forRoot(),
     ],
     exports: [
          SketlonComponent,
          ConfirmationModalComponent,
          ProductDetailComponent,
          AddEditAddressComponent,
          EditProfileComponent,
          NavbarComponent,
          LoginModalComponent,
          RegisterModalComponent
     ]
})
export class CommonComponentsModule { }