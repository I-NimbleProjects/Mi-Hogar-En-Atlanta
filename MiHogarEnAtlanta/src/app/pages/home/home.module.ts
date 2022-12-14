import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { HotOfferTodayComponent } from './hot-offer-today/hot-offer-today.component';
import { FeaturedPropertiesComponent } from './featured-properties/featured-properties.component';
// import { NgxYoutubePlayerModule } from 'ngx-youtube-player'

export const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [
    HomeComponent, 
    HotOfferTodayComponent,
    FeaturedPropertiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    // NgxYoutubePlayerModule
  ]
})
export class HomeModule { }
