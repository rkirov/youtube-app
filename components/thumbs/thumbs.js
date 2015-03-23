import {Component, Template, EventEmitter} from 'angular2/angular2';

const UP = 'up';
const DOWN = 'down';
const NONE = 'none';

@Component({
  selector: 'thumbs'
})
@Template({
  url: 'components/thumbs/thumbs.html',
  directives: []
})
export class Thumbs {
  state: string;
  constructor(@EventEmitter('change') changer:Function) {
    // for cleaner use in templates
    this.UP = UP;
    this.DOWN = DOWN;
    this.NONE = NONE;

    this.state = NONE;
    this.changer = changer;
  }

  onClick(newState) {
    if (newState == this.state) newState = NONE;
    var oldState = this.state;
    this.state = newState;
    this.changer({
      upDiff: this.upDiff(oldState, newState),
      downDiff: this.downDiff(oldState, newState)
    });
  }

  upDiff(oldState, newState) {
    if (oldState == NONE && newState == UP) return 1;
    if (oldState == NONE && newState == DOWN) return 0;
    if (oldState == DOWN && newState == UP) return 1;
    if (oldState == UP && newState == DOWN) return -1;
    if (oldState == DOWN && newState == NONE) return 0;
    if (oldState == UP && newState == NONE) return -1;
  }

  downDiff(oldState, newState) {
    if (oldState == NONE && newState == UP) return 0;
    if (oldState == NONE && newState == DOWN) return 1;
    if (oldState == DOWN && newState == UP) return -1;
    if (oldState == UP && newState == DOWN) return 1;
    if (oldState == DOWN && newState == NONE) return -1;
    if (oldState == UP && newState == NONE) return 0;
  }

  reset() {
    this.state = this.NONE;
  }
}
