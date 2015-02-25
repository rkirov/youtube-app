import * as ng from 'angular2/angular2';
import {EitherPanel} from 'components/eitherpanel';
import {Thumbs} from 'components/thumbs';

@ng.Component({
  selector: 'search-result',
  bind: {
    'video': 'video'
  }
})
@ng.Template({
  url: '/components/search_result.html',
  directives: [ng.Foreach, ng.If, EitherPanel, Thumbs]
})
export class SearchResult {
  state: string;
  playerShowing: boolean;
  constructor() {
    this.playerShowing = false;
    this.state = 'thumbnail';
  }

  newState(state) {
    this.state = State[state];
  }

  url() {
    return this.video.player.embedHtml.match(/src='([^']*)'/)[1];
  }

  togglePlayer() {
    this.playerShowing = !this.playerShowing;
  }

  thumbsChange(event) {
    var likes = parseInt(this.video.statistics.likeCount, 10);
    var dislikes = parseInt(this.video.statistics.dislikeCount, 10);

    likes += event.upDiff;
    dislikes += event.downDiff;

    this.video.statistics.likeCount = likes + '';
    this.video.statistics.dislikeCount = dislikes + '';
  }
}

const State = {
   '-1': 'unstarted',
   '0': 'ended',
   '1': 'playing',
   '2': 'paused',
   '3': 'buffering',
   '5': 'video cued'
};
