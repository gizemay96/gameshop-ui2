import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/modules/material.module';
import { SharedModule } from '@app/modules/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { CommonComponentsModule } from '@app/modules/common-components.module';

@NgModule({
     imports: [
          CommonModule,
          HttpClientModule,
          ProfileRoutingModule,
          MaterialModule,
          SharedModule.forRoot(),
          CommonComponentsModule,
     ],
     declarations: [ProfileComponent],
})
export class ProfilePageModule {
}

   
