import { ModuleWithProviders, NgModule } from '@angular/core';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
     return new TranslateHttpLoader(http);
   }

@NgModule({
     imports: [
          NgxSkeletonLoaderModule.forRoot({ animation: 'progress', loadingText: 'This item is actually loading...' }),
          InfiniteScrollModule,
          NgxStarRatingModule,
          NgxMaskModule.forRoot(),
          FormsModule,
          ReactiveFormsModule,
          TranslateModule.forChild({
               loader: {
               provide: TranslateLoader,
               useFactory: HttpLoaderFactory,
               deps: [HttpClient]
             },
             isolate: false
         }),
     ],
     exports: [
          NgxSkeletonLoaderModule,
          InfiniteScrollModule,
          NgxStarRatingModule,
          NgxMaskModule,
          FormsModule,
          ReactiveFormsModule,
          TranslateModule
     ]
})
export class SharedModule { 
     static forRoot(): ModuleWithProviders<any> {
          return {
            ngModule: SharedModule,
          }
        }
}
