import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/modules/material.module';
import { SharedModule } from '@app/modules/shared.module';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonComponentsModule } from '@app/modules/common-components.module';

@NgModule({
     imports: [
          CommonModule,
          HttpClientModule,
          CartRoutingModule,
          MaterialModule,
          SharedModule.forRoot(),
          CommonComponentsModule,
     ],
     declarations: [CartComponent],
})
export class CartPageModule {
}

