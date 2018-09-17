import { Component, Input } from '@angular/core';

/**
 * Generated class for the ImgLazyLoadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'img-lazy-load',
  templateUrl: 'img-lazy-load.html'
})
export class ImgLazyLoadComponent {
  default: string = 'assets/imgs/newslogobig.jpg';
  text: string;

  constructor() {
    console.log('Hello ImgLazyLoadComponent Component');
    this.text = 'Hello World';
  }
  @Input() src: string //要显示的图片

  ngOnInit() {
    let img = new Image();
    img.src = this.src;
    img.onload = () => {
      //这里为了达到演示效果给了两秒的延迟，实际使用中不需要延迟
      setTimeout(() => {
        this.default = this.src;
      }, 20000)
    }
  }
}
