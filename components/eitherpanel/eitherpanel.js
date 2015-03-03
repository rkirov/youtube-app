import {Component, Template, If} from 'angular2/angular2';

@Component({
  selector: 'either-panel'
})
@Template({
  url: 'components/eitherpanel/eitherpanel.html',
  directives: [If]
})
export class EitherPanel {
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
