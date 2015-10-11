import {Component, View, EventEmitter, Output} from 'angular2/angular2';

enum State {
  UP, DOWN, NONE
}

@Component({
  selector: 'thumbs'
})
@View({
  templateUrl: 'components/thumbs/thumbs.html',
  styleUrls: ['components/thumbs/thumbs.css']
})
export class Thumbs {
  state: State;
  states;
  @Output()
  change: EventEmitter;
  constructor() {
    // For access in the template;
    this.states = State;

    this.state = State.NONE;
    this.change = new EventEmitter();
  }

  onClick(newState) {
    if (newState == this.state) newState = State.NONE;
    var oldState = this.state;
    this.state = newState;
    this.change.next({
      upDiff: this.upDiff(oldState, newState),
      downDiff: this.downDiff(oldState, newState)
    });
  }

  upDiff(oldState, newState) {
    if (oldState == State.NONE && newState == State.UP) return 1;
    if (oldState == State.NONE && newState == State.DOWN) return 0;
    if (oldState == State.DOWN && newState == State.UP) return 1;
    if (oldState == State.UP && newState == State.DOWN) return -1;
    if (oldState == State.DOWN && newState == State.NONE) return 0;
    if (oldState == State.UP && newState == State.NONE) return -1;
  }

  downDiff(oldState, newState) {
    if (oldState == State.NONE && newState == State.UP) return 0;
    if (oldState == State.NONE && newState == State.DOWN) return 1;
    if (oldState == State.DOWN && newState == State.UP) return -1;
    if (oldState == State.UP && newState == State.DOWN) return 1;
    if (oldState == State.DOWN && newState == State.NONE) return -1;
    if (oldState == State.UP && newState == State.NONE) return 0;
  }

  reset() {
    this.state = State.NONE;
  }
}
