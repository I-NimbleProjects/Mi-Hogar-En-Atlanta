import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  public imageNosotros;
  public config: SwiperConfigInterface = { };
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };
  constructor(public appService:AppService) { }

  ngOnInit() {
    this.imageNosotros = this.appService.getImagesNosotros();
  }

  ngAfterViewInit(){
      this.config = {
        observer: true,
        slidesPerView: 1,
        // spaceBetween: 50,       
        keyboard: false,
        navigation: false,
        // pagination: true,
        grabCursor: true,        
        loop: false,
        preloadImages: false,
        lazy: true,  
        pagination: this.pagination,
        // breakpoints: {
        //   320: {
        //     slidesPerView: 1
        //   },
        //   600: {
        //     slidesPerView: 1
        //   },
        //   960: {
        //     slidesPerView: 2
        //   },
        //   1280: {
        //     slidesPerView: 4
        //   }
        // },
        // centerInsufficientSlides: true
      }
    }
}
