import * as ng from 'angular2/angular2';

@ng.Component({
  selector: 'swiper',
})
@ng.Template({
  url: '/components/swiper.html',
  directives: [ng.Foreach, ng.If, Swiper]
})
export class Swiper {
  constructor() {
    this.showing = 'left';
  }

  toggle() {
    this.showing = this.showing == 'left' ? 'right' : 'left';
  }

  leftShowing() {
    return this.showing == 'left';
  }

  rightShowing() {
    return this.showing == 'right';
  }
}
