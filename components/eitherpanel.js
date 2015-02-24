import * as ng from 'angular2/angular2';

@ng.Component({
  selector: 'either-panel',
})
@ng.Template({
  url: '/components/eitherpanel.html',
  directives: [ng.Foreach, ng.If]
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
