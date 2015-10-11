import {Component, View, CORE_DIRECTIVES, Input} from 'angular2/angular2';
import {EitherPanel} from '../eitherpanel/eitherpanel';
import {Thumbs} from '../thumbs/thumbs';
import {Video} from '../../models/video';
import {EitherPanel} from "../eitherpanel/eitherpanel";


const State = {
  '-2': 'thumbnail',
  '-1': 'unstarted',
  '0': 'ended',
  '1': 'playing',
  '2': 'paused',
  '3': 'buffering',
  '5': 'video cued'
};


@Component({
  selector: 'search-result'
})
@View({
  templateUrl: 'components/search_result/search_result.html',
  directives: [CORE_DIRECTIVES, Thumbs, EitherPanel]
})
export class SearchResult {
  state: string;
  playerShowing: boolean;
  @Input()
  video: Video;

  constructor() {
    this.playerShowing = false;
    this.state = State[-2];
  }

  setState(state) {
    console.log(state);
    this.state = State[state];
  }

  isPlaying() {
    return this.state == State[1];
  }

  url() {
    return this.video.player.embedHtml.match(/src='([^']*)'/)[1];
  }

  togglePlayer() {
    this.playerShowing = !this.playerShowing;
    this.state = State[-1];
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
