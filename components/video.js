import * as ng from 'angular2/angular2';
import {Swiper} from 'components/swiper';
import {Thumbs} from 'components/thumbs';

@ng.Component({
  selector: 'youtube-video',
  bind: {
    'video': 'video'
  }
})
@ng.Template({
  url: '/components/video.html',
  directives: [ng.Foreach, ng.If, Swiper, Thumbs]
})
export class Video {
  player;
  constructor() {
    this.player = false; 
  }

  url() {
    return this.video.player.embedHtml.match(/src='([^']*)'/)[1];
  }

  json(input) {
    return JSON.stringify(input);
  }

  togglePlayer() {
    this.player = !this.player;
  }

  onSwipe() {
    console.log('swiped');
  }

  thumbsChange(event) {
    var likes = parseInt(this.video.statistics.likeCount);
    var dislikes = parseInt(this.video.statistics.dislikeCount);

    likes += event.upDiff;
    dislikes += event.downDiff;

    this.video.statistics.likeCount = likes + '';
    this.video.statistics.dislikeCount = dislikes + '';
  }
}
