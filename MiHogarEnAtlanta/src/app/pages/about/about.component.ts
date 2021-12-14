import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  // template: `
  //   <gallery [items]="images", thumbPosition="left"></gallery>
  // `
})
export class AboutComponent implements OnInit {
  public images: GalleryItem[];
  constructor() { }

  ngOnInit() {
    this.images = [
      new ImageItem({ src: 'src\assets\images\fotosContact\image3.png', thumb: 'src\assets\images\fotosContact\image3.png' }),
      ];
  }

}
