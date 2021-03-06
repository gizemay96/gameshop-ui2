import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '@app/modules/material.module';
import { SharedModule } from '@app/modules/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonComponentsModule } from '@app/modules/common-components.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
     declarations: [HomeComponent],
     imports: [
          CommonModule,
          HttpClientModule,
          HomeRoutingModule,
          MaterialModule,
          SharedModule.forRoot(),
          CommonComponentsModule,
     ],
})
export class HomePageModule {}
