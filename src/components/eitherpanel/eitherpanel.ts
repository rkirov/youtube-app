import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';

@Component({
  selector: 'either-panel'
})
@View({
  templateUrl: 'components/eitherpanel/eitherpanel.html',
  directives: [CORE_DIRECTIVES]
})
export class EitherPanel {
  showing: string = 'left';

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
